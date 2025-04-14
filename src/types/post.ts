export type Metadata = {
    id: string;
    slug: string;
    contentSlug: string;
    relatedSlug: string;
    title: string;
    titleFr?: string;
    description: string;
    date: string;
    author: string;
    authorImage: string;
    type: number;
    coverImageAlt: string;
    metaDescription: string;
    seoTitle: string;
    updatedAt: string;
    createdAt?: string;
    isPublished: boolean;
}

export type Post = {
    post: Metadata,
    markdown: unknown
}