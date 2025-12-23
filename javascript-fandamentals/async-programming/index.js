// async programming

async function datafetch() {
     try {
          let api = "https://fakestoreapi.com/products"
          const res = await fetch(api)
          const finalRes = await res.json()
          console.log(finalRes);

     } catch (error) {
          console.log(error);

     }
}
datafetch()
