import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import {getAllPosts, getAllStaticContent} from '../lib/api'
import Head from 'next/head'
import {CMS_NAME} from '../lib/constants'
import Post from '../interfaces/post'
import StaticItem from '../interfaces/staticItem'

type Props = {
    allPosts: Post[]
    allStatics: StaticItem[]
}

export default function Index({allPosts, allStatics}: Props) {
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    console.log('moreP', morePosts)
    console.log('allStatics', allStatics)
    return (
        <>
            <Layout>
                <Head>
                    <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
                </Head>
                <Container>
                    <Intro allStatics={allStatics}/>
                    {heroPost && (
                        <HeroPost
                            title={heroPost.title}
                            coverImage={heroPost.coverImage}
                            date={heroPost.date}
                            author={heroPost.author}
                            slug={heroPost.slug}
                            excerpt={heroPost.excerpt}
                        />
                    )}
                    {morePosts.length > 0 && <MoreStories posts={morePosts}/>}
                </Container>
            </Layout>
        </>
    )
}

export const getStaticProps = async () => {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
    ]);

    const allStatics = getAllStaticContent([
        'title',
        'statics',
        'coverImage',
    ])
    console.log('aaaaaa', allStatics)
    return {
        props: {
            allPosts,
            allStatics
        },
    }
}
