import { createServer } from 'http'
// import { totalSales } from './total-sales.js'
// import { totalSales } from './total-sales-batch.js'
// import { totalSales } from './total-sales-cache.js'
import { totalSales } from './total-sales-redis.js';
import redisClient from './redis-client.js';




const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const product = url.searchParams.get('product')
  console.log(`Processing query: ${url.search}`)

  const sum = await totalSales(product)

  res.setHeader('Content-Type', 'application/json')
  res.writeHead(200)
  res.end(JSON.stringify({
    product,
    sum
  }))
})

redisClient.connect().then(() => {
  server.listen(8000, () => console.log('Server started'));
})
