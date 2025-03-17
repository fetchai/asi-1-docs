import {useMDXComponents} from '../../mdx-components'

// eslint-disable-next-line react-hooks/rules-of-hooks -- isn't react hook
const {code: Code} = useMDXComponents()

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

            core: {
                display: 'hidden'
            },

        }


    },
    refs: {
        type: 'page',
        title: 'References',
        items: {

            index: {
                "href": "/refs/api/intro",
                "title": "Introduction"
            },

            "chat-completion-example": {
                "href": "/refs/api/chat-completion-example",
                "title": "Create chat completion"
            },


            api: {
                display: 'hidden'
            },
        },
    }
}