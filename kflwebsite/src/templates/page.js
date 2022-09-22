import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import * as styles from './page.module.css'

class PageTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulPage')
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(page.description.raw)
    )
    const plainTextBody = documentToPlainTextString(JSON.parse(page.body.raw))
    
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target
        return (
           <GatsbyImage
              image={getImage(gatsbyImage)}
              alt={description}
           />
         )
        },
      },
    };

    return (
      <Layout location={this.props.location}>
        <Seo
          title={page.title}
          description={plainTextDescription}
          image={`http:${page.heroImage.resize.src}`}
        />
        <Hero
          image={page.heroImage?.gatsbyImage}
          title={page.title}
          content={page.description}
        />
        <div className={styles.container}>
          <div className={styles.article}>
            <div className={styles.body}>
              {page.body?.raw && renderRichText(page.body, options)}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug(
    $slug: String!
    $previousPageSlug: String
    $nextPageSlug: String
  ) {
    contentfulPage(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      heroImage {
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw
        
      }
      description {
        raw
      }
    }
    previous: contentfulPage(slug: { eq: $previousPageSlug }) {
      slug
      title
    }
    next: contentfulPage(slug: { eq: $nextPageSlug }) {
      slug
      title
    }
  }
`
