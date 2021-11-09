import { Link } from 'react-router-dom'

export default function Home () {
  return (
    <>
      <h1>Home</h1>
      <nav>
        <ul>
          <li>
            <Link to="/examples/multi_row_basic">基本的なMultiRow</Link>
          </li>
          <li>
            <Link to="/examples/multi_row_structured">構造化されたMultiRow</Link>
          </li>
          <li>
            <Link to="/examples/multi_row_custom_cell">任意のセルを表示するMultiRow</Link>
          </li>
          <li>
            <Link to="/examples/multi_row_async_resource">非同期で取得したデータを用いたMultiRow</Link>
          </li>
          <li>
            <Link to="/examples/multi_row_totalling">集計を用いたMultiRow</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}
