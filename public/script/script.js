const product = document.querySelectorAll('.product-item');

 product.forEach((pro) => {
   console.log(pro.querySelector('span').innerHTML);
   console.log(pro.querySelector('button span').innerHTML);
   
   pro.querySelector('button').addEventListener('click', () => {
      const menu = pro.querySelector('span').innerHTML;
      const price = pro.querySelector('button span').innerHTML;

      fetch('/addToCart', {
        method: "post",
        body: JSON.stringify({ menu, price }),
        headers: {
          "Content-Type": "application/json"
        },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); 
      })
      .catch(error => {
        console.error(error);
      });
      
    }) 
 })


