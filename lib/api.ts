import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'

const postsOrStaticsDirectory = (isStatic: boolean = false) => join(process.cwd(), isStatic ? '_static' : '_posts')

export function getItemContent(isStatic: boolean = false) {
    return fs.readdirSync(postsOrStaticsDirectory(isStatic))
}

let called = 1;

export function getPostBySlug(dataItem: string, fields: string[] = [], isStatic: boolean = false) {
    const realData = dataItem?.replace(/\.md$/, '')
    const fullPath = join(postsOrStaticsDirectory(isStatic), `${realData}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data, content} = matter(fileContents)

    type Items = {
        [key: string]: string
    }

    const items: Items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug' || field === 'statics') {
            items[field] = realData
        }
        if (field === 'content') {
            items[field] = content
        }

        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })
    console.log('22222 called times', called)
    called++
    return items
}

export function getAllPosts(fields: string[] = []) {
    const slugs = getItemContent()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}

export function getAllStaticContent(fields: string[] = []) {
    const contents = getItemContent(true)

    const statics = contents
        .map((content) => getPostBySlug(content, fields, true))
    // sort posts by date in descending order
    // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return statics
}
