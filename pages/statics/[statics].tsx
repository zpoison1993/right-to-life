import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import {getPostBySlug, getAllPosts, getAllStaticContent} from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import {CMS_NAME} from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import type StaticItem from '../../interfaces/staticItem'

type Props = {
    post: StaticItem
    morePosts: StaticItem[]
    preview?: boolean
}

export default function Statics({post, morePosts, preview}: Props) {
    console.log(post)
    const router = useRouter()
    const title = `${post.title} | Next.js Blog Example with ${CMS_NAME}`
    if (!router.isFallback && !post?.statics) {
        return <ErrorPage statusCode={404}/>
    }
    return (
        <Layout preview={preview}>
            <Container>
                <Header/>
                {router.isFallback ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article className="mb-32">
                            <Head>
                                <title>{title}</title>
                                <meta property="og:image" content={''}/>
                            </Head>
                            <PostHeader
                                title={post.title}
                                coverImage={post.coverImage}
                                date={''}
                            />
                            <PostBody content={post.content}/>
                        </article>
                    </>
                )}
            </Container>
        </Layout>
    )
}

type Params = {
    params: {
        statics: string
    }
}

export async function getStaticProps({params}: Params) {
    console.log('params', params)
    const staticItem = getPostBySlug(
        params.statics,
        [
            'title',
            'statics',
            'content',
            'coverImage',
        ],
        true,
    )
    const content = await markdownToHtml(staticItem.content || '')

    return {
        props: {
            post: {
                ...staticItem,
                content,
            },
        },
    }
}

export async function getStaticPaths() {
    const statics = getAllStaticContent(['statics'])
    console.log('statics', statics)
    return {
        paths: statics.map((staticItem) => {
            return {
                params: {
                    statics: staticItem.statics,
                },
            }
        }),
        fallback: false,
    }
}
