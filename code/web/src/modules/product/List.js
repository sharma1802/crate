// Imports
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'

// App Imports
import { routeImage } from '../../setup/routes'
import Loading from '../common/Loading'
import { getList as getProductList } from './api/actions'
import EmptyMessage from '../common/EmptyMessage'

// Component
class List extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getProductList('ASC'))
  }

  // Runs on client only
  componentDidMount() {
    this.props.getProductList('ASC')
  }

  render() {
    const { isLoading, list } = this.props.products;
  
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Products</title>
        </Helmet>

        {/* Product list */}
        <Grid alignCenter={true} style={{ padding: '1em' }}>
          <GridCell>
            <table className="striped">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Created at</th>
                  <th>Updated at</th>
                </tr>
              </thead>

              <tbody>
                {
                  isLoading
                    ? <tr>
                      <td colSpan="6">
                        <Loading message="loading products..." />
                      </td>
                    </tr>
                    : list.length > 0
                      ? list.map(({ id, image, name, description, createdAt, updatedAt }) => (
                        <tr key={id}>
                          <td>
                            <img src={routeImage + image} alt={name} style={{ width: 100 }} />
                          </td>

                          <td>
                            {name}
                          </td>

                          <td>
                            {description}
                          </td>

                          <td>
                            {new Date(parseInt(createdAt)).toDateString()}
                          </td>

                          <td>
                            {new Date(parseInt(updatedAt)).toDateString()}
                          </td>
                        </tr>
                      ))
                      : <tr>
                        <td colSpan="6">
                          <EmptyMessage message="No products to show." />
                        </td>
                      </tr>
                }
              </tbody>
            </table>
          </GridCell>
        </Grid>

      </div>
    )
  }
}

// Component State
function listState(state) {
  return {
    products: state.products
  }
}

export default connect(listState, { getProductList })(List)
