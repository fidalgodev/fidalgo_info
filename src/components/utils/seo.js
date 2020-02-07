import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ meta, lang, title, description, slug = '' }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            social {
              twitter
            }
            imageShare
          }
        }
      }
    `
  );

  const { siteMetadata } = site;
  const metaDescription = description || siteMetadata.description;
  const url = `${siteMetadata.siteUrl}${slug}`;
  const metaImage = `${siteMetadata.siteUrl}/${siteMetadata.imageShare}`;

  console.log(url);

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      {...(title
        ? {
            titleTemplate: `%s — ${siteMetadata.title}`,
            title
          }
        : {
            title: `${siteMetadata.title} — Setup Info, FAQ, Recommendations, Uses...`
          })}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: 'og:url',
          content: url
        },
        {
          property: `og:title`,
          content: title || siteMetadata.title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: `@${siteMetadata.social.twitter}`
        },
        {
          name: `twitter:title`,
          content: title || siteMetadata.title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ]
        .concat([
          {
            property: 'og:image',
            content: metaImage
          },
          {
            name: 'twitter:image',
            content: metaImage
          }
        ])
        .concat(meta)}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string
};

export default SEO;
