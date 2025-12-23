// async programming


async function datafetch() {
     let api = "https://fakestoreapi.com/products"
     try {
          const res = await fetch(api)
          const finalRes = await res.json()
          console.log(finalRes);

     } catch (error) {
          console.log(error);

     }
}
datafetch()
