export async function generateMetadata ({params}: {params:{id:string}}) {
    return {
        title: "This is posts page."
    }
}

const Blog = ({params}: {params:{id:string}}) => {
  console.log(params.id)
    return <h1>This is Blog{params.id}</h1>
}

export function generateStaticParams() {
    return [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ];
  }

export default Blog;