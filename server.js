// sk_test_YPxfgEWUG4YBlLY0wfwrUlVa
// Coffee => price_1LxXcoHz6jUVw9C988sJLODD
// Sunglasses => price_1LxYUkHz6jUVw9C9rJMpiwK7
// Camera => price_1LxYVwHz6jUVw9C9yF3x60SG

import express from 'express'
import cors from 'cors'
import stripeImport from 'stripe'

const stripe = stripeImport('sk_test_YPxfgEWUG4YBlLY0wfwrUlVa')

const app = express()
app.use(cors())
app.use(express.static("public"))
app.use(express.json())

app.post("/checkout", async (req, res) => {
  console.log(req.body)
  const items = req.body.items
  let lineItems = []
  items.forEach(item => {
    lineItems.push(
      {
        price: item.id,
        quantity: item.quantity
      }
    )
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  })

  res.send(JSON.stringify({
    url: session.url
  }))
})

app.listen(4000, () => console.log('Listening on port 4000'))