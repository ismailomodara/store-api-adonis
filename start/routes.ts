/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for the majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/api/v1', () => {
  return {
    message: 'API Warehouse',
  }
})
Route.resource('/api/v1/statuses', 'StatusesController').apiOnly()
Route.resource('/api/v1/companies', 'CompaniesController').apiOnly()
Route.resource('/api/v1/products', 'ProductsController').apiOnly()

Route.post('/api/v1/products/bulk', 'ProductsController.storeMany')
