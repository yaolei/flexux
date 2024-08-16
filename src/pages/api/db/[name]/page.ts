import {NextRequest, NextResponse} from 'next/server'
export async function generateMetadata ({params}: {params:{name:string}}) {
    return {
        title: "This is posts page."
    }
}

const Blog = ( res: NextResponse, req:NextRequest) => {

  console.log(res.body)

}

export function generateStaticParams() {
    return [
      { name: 'new' },
      { name: 'update' },
      { name: 'delete' },
    ];
  }

export default Blog;