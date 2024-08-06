type Repository = {
    fullname:string
}

export function generateStaticParams() {
  return [
    { name: '1' },
    { name: '2' },
    { name: '3' },
  ];
}

const page = () => {

  return  (
    <section>
        <h1>App Router</h1>
        <p>{Date.now()}</p>
    </section>
  )
}

export default page;