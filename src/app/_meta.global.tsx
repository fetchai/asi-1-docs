import { useMDXComponents } from '../../mdx-components'

// eslint-disable-next-line react-hooks/rules-of-hooks -- isn't react hook
const { code: Code } = useMDXComponents()

export default {
    index: {
        type: 'page',
        display: 'hidden'
    },
    docs: {
        type: 'page',
        title: 'Documentation',
        theme: {
            breadcrumb: false
        },
        items: {

            _core: {
                type: 'separator',
                title: 'Get Started'
            },

            index: "Introduction",

            'api-key': {
                href: '/docs/core/api-key',
                title: 'Get API Keys'
            },

            'chat-completion': {
                href: '/docs/core/chat-completion',
                title: 'Chat Completion Example'
            },

            'link-account': {
                href: '/docs/core/link-account',
                title: 'Link Account'
            },
            _apis: {
                type: 'separator',
                title: 'Api Reference'
            },
            'introduction': {
                href: "/docs/core/apis/introduction",
                title: "Introduction"
            },
            'create-chat-completion': {
                href: "/docs/core/apis/create-chat-completion",
                title: "Create Chat Completion"
            },
            core: {
                display: 'hidden'
            },
        }
    }
}