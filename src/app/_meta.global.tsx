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
            quickstart: {
                title: 'Quickstart',
                theme: {
                    breadcrumb: false
                }
            },

            _beginner: {
                type: 'separator',
                title: 'Get started'
            },

            index: "Introduction",

            'install': {
                href: '/docs/getting-started/install',
                title: 'Installation'
            },


            'create': {
                href: '/docs/getting-started/create',
                title: 'Create an Agent'
            },


            'tokens': {
                href: '/docs/getting-started/tokens',
                title: 'Get Tokens for Agents'
            },

            __: {
                type: 'separator',
                title: 'Core concepts'
            },

            'communication': {
                href: '/docs/guides/communication',
                title: 'Communication'
            },
            'address': {
                href: '/docs/getting-started/address',
                title: 'Addresses'
            },
            'Seed Phrase': {
                href: '/docs/getting-started/seed',
                title: 'Seed phrase'
            },
            'protocols': {
                href: '/docs/guides/protocols',
                title: 'Protocols'
            },
            'handlers': {
                href: '/docs/guides/handlers',
                title: 'Handlers'
            },
            'storage': {
                href: '/docs/guides/storage',
                title: 'Storage'
            },
            'types': {
                href: '/docs/guides/types',
                title: 'Types'
            },
            'bureau': {
                href: '/docs/guides/bureau',
                title: 'Bureau'
            },
            'broadcast': {
                href: '/docs/guides/broadcast',
                title: 'Broadcast'
            },
            'ai_engine_compatible_agent': {
                href: '/docs/guides/ai_engine_compatible_agent',
                title: 'AI Engine compatible Agents'
            },
            'run_local_agents': {
                href: '/docs/guides/run_local_agents',
                title: 'Deployments'
            },

            _: {
                type: 'separator',
                title: 'Advanced'
            },
            'dialogues': {
                href: '/docs/guides/dialogues',
                title: 'Dialogues'
            },
            'async_loops': {
                href: '/docs/guides/async_loops',
                title: 'Async loops'
            },
            'msg_verification': {
                href: '/docs/guides/msg_verification',
                title: 'Message verification'
            },
            'localwallet': {
                href: '/docs/guides/localwallet',
                title: 'Local wallet'
            },
            'name_service': {
                href: '/docs/guides/name_service',
                title: 'Agents Name Service',
            },

            _examples: {
                type: 'separator',
                title: 'Example Agents'
            },

            'langchain_agent': {
                href: '/docs/guides/langchain_agent',
                title: 'Build a RAG Agent'
            },
            'rest_endpoints': {
                href: '/docs/guides/rest_endpoints',
                title: 'REST endpoints'
            },
            'public_private_agents': {
                href: '/docs/guides/public_private_agents',
                title: 'Public and Private Agents'
            },
            'send_tokens': {
                href: '/docs/guides/send_tokens',
                title: 'Sending tokens'
            },
            'chat_protocol': {
                href: '/docs/guides/chat_protocol',
                title: 'Chat Protocol'
            },
            'hugging-face-agent': {
                href: '/docs/examples/hugging-face-agent',
                title: "Hugging Face"
            },
            'jupyter-agent': {
                href: '/docs/examples/jupyter-agent',
                title: "Jupyter Notebook"
            },
            'postgres-database-with-an-agent': {
                href: '/docs/examples/postgres',
                title: "Postgres"
            },
            'react-example': {
                href: '/docs/examples/react-web',
                title: "React web app"
            },
            'computer_use_demo': {
                href: '/docs/examples/anthropic',
                title: 'Anthropic'
            },
            'startup_analyzer': {
                href: '/docs/examples/crewai',
                title: 'CrewAI'
            },
            'langchain_intro': {
                href: '/docs/examples/langchain',
                title: 'Langchain'
            },
            'openai_intro': {
                href: '/docs/examples/openai/swarm',
                title: 'Swarm'
            },

            _agentverse: {
                type: 'separator',
                title: 'Agentverse'
            },

            'mailbox': {
                href: '/docs/agentverse/mailbox',
                title: 'Mailbox'
            },
            'proxy': {
                href: '/docs/agentverse/proxy',
                title: 'Proxy'
            },
            'inspector': {
                href: '/docs/agentverse/inspector',
                title: 'Inspector'
            },
            'functions': {
                href: '/docs/agentverse/functions',
                title: 'Functions'
            },

            _contracts: {
                type: 'separator',
                title: 'Almanac Contract'
            },
            'almanac_intro': {
                href: '/docs/almanac',
                title: 'Almanac Introduction'
            },
            'almanac_endpoints': {
                href: '/docs/almanac/endpoints',
                title: 'Endpoints'
            },
            'almanac_registration': {
                href: '/docs/almanac/registration',
                title: 'Registration'
            },


            agentverse: {
                display: 'hidden'
            },
            examples: {
                display: 'hidden'
            },

            almanac: {
                display: 'hidden'
            },


            "getting-started": {
                display: 'hidden'
            },

            guides: {
                display: 'hidden'
            },

        }


    },
    refs: {
        type: 'page',
        title: 'References',
        items: {

            index: {
                "href": "/refs/api/agent",
                "title": "agent"
            },

            "config": {
                "href": "/refs/api/config",
                "title": "config"
            },


            "mailbox": {
                "href": "/refs/api/mailbox",
                "title": "mailbox"
            },
            "models": {
                "href": "/refs/api/models",
                "title": "models"
            },
            "network": {
                "href": "/refs/api/network",
                "title": "network"
            },
            "protocol": {
                "href": "/refs/api/protocol",
                "title": "protocol"
            },
            "query": {
                "href": "/refs/api/query",
                "title": "query"
            },
            "registration": {
                "href": "/refs/api/registration",
                "title": "registration"
            },
            "resolver": {
                "href": "/refs/api/resolver",
                "title": "resolver"
            },
            "setup": {
                "href": "/refs/api/setup",
                "title": "setup"
            },
            "storage": {
                "href": "/refs/api/storage",
                "title": "storage"
            },
            "types": {
                "href": "/refs/api/types",
                "title": "types"
            },
            "utils": {
                "href": "/refs/api/utils",
                "title": "utils"
            },
            "wallet_messaging": {
                "href": "/refs/api/wallet_messaging",
                "title": "wallet_messaging"

            },

            exp :
                {
                    type : 'separator',
                    title: 'experimental'
                },

            "experimental/dialogues": {
                "href": "/refs/api/experimental/dialogues",
                "title": "dialogues"
            },
            "experimental/quota": {
                "href": "/refs/api/experimental/quota",
                "title": "quota"
            },


            api: {
                display: 'hidden'
            },
        },
    }
}