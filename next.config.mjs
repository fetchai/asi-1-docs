import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false
  },
  contentDirBasePath: '/docs'
})

export default withNextra({
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs",
        permanent: true,
      },
      {
        source: "/examples/ai-engine-api/chat_api_example",
        destination: "/docs",
        permanent: true
      },
      {
        source: "/concepts/ai-engine/ai-engine-intro",
        destination: "/docs",
        permanent: true
      },
      {
        source: "/concepts/ai-engine/deltav",
        destination: "/docs",
        permanent: true
      },
      {
        source: "/concepts/ai-engine/powering-connections-and-smart-operations-in-deltav",
        destination: "/docs",
        permanent: true
      },
      {
        source: "/concepts/ai-engine/ai-engine-personalities",
        destination: "/docs",
        permanent: true
      },
      {
        source: "/guides/ai-engine-sdk/javascript",
        destination: "/docs",
        permanent: true
      },
      {
        source: "/guides/ai-engine-sdk/python",
        destination: "/docs",
        permanent: true
      },
      {
        source: "",
        destination: "/docs",
        permanent: true
      },
      {
        source: "",
        destination: "/docs",
        permanent: true
      },
      {
        source: "",
        destination: "/docs",
        permanent: true
      },
      {
        source: "",
        destination: "/docs",
        permanent: true
      }
    ]
  }
})
