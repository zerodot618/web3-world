import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Article from "../../components/Article";
import fs from 'fs';
import matter from 'gray-matter';


export const getStaticProps: GetStaticProps<{ posts: any }> = async () => {
    const files = fs.readdirSync('./posts');

    const posts = files.map((fileName: any) => {
        const slug = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`posts/${fileName}`, 'utf-8');
        const { data: frontmatter } = matter(readFile);
        return {
            slug,
            ...frontmatter,
        };
    });

    return {
        props: {
            posts,
        },
    }
}

export default function Blog({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <>
            <Head>
                <title>ZeroDot618's Blog</title>
                <meta name="description" content="blog's description" />
                <link ref="icon" href="/favicon.ico" />
            </Head>
            <section className="px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 p-4">Blog</h1>
                    {
                        posts.map((post: any) => (
                            <Article className="border-b-2" key={post.slug} post={post}/>
                        ))
                    }
                </div>
            </section>

        </>
    );
}


