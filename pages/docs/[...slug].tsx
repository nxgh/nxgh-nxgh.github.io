import React, { PropsWithChildren } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { getStaticPathsResult, getStaticPropsResult } from 'src/mdx-helper/getDir'
import { MDXComponent } from 'src/mdx-helper/MDXComponent'
import { useRouter } from 'next/router'
import DocLayout from 'src/Layout/DocLayout'

const basePath = '/docs'

export const getStaticPaths: GetStaticPaths = async () => await getStaticPathsResult(basePath)

export const getStaticProps: GetStaticProps = async (context) =>
  await getStaticPropsResult(basePath, context.params!.slug! as string[])

export default function Layout({
  previewSource,
  allPostsData,
}: PropsWithChildren<{
  previewSource: string
  allPostsData: { id: string; title: string }[]
}>) {
  const router = useRouter()

  return (
    <DocLayout route={router.asPath} postsData={allPostsData} onClick={(key) => router.push(`/docs/${key}`)}>
      <MDXComponent code={previewSource} />
    </DocLayout>
  )
}
