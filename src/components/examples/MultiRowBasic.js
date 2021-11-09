import { useRef } from 'react'
import { CollectionView } from '@grapecity/wijmo'
import {
  MultiRow,
  MultiRowCellGroup,
  MultiRowCell
} from '@grapecity/wijmo.react.grid.multirow'

const people = [{
  name: 'Tiger Noble',
  phone: '1-286-619-5049',
  email: 'elit.pharetra.ut@google.ca',
  country: 'Australia'
}, {
  name: 'Noble Schneider',
  phone: '1-319-418-4747',
  email: 'faucibus.id.libero@yahoo.edu',
  country: 'Turkey'
}, {
  name: 'Thane Galloway',
  phone: '1-632-840-7553',
  email: 'integer@outlook.net',
  country: 'Chile'
}, {
  name: 'Armando Hoffman',
  phone: '1-634-524-2470',
  email: 'elit.aliquam@google.couk',
  country: 'China'
}, {
  name: 'Brenna Christian',
  phone: '(994) 247-2242',
  email: 'diam.pellentesque@google.couk',
  country: 'Poland'
}]

export default function BasicMultiRowExample () {
  const itemsSourceRef = useRef(new CollectionView(people))

  return (
    <>
      <h1>基本的なMultiRow</h1>
      <MultiRow itemsSource={itemsSourceRef.current}>
        <MultiRowCellGroup>
          <MultiRowCell header="氏名" binding="name" width={200} />
        </MultiRowCellGroup>
        <MultiRowCellGroup>
          <MultiRowCell header="電話番号" binding="phone" width={180} />
        </MultiRowCellGroup>
        <MultiRowCellGroup>
          <MultiRowCell
            header="メールアドレス" binding="email"
            width={320} />
        </MultiRowCellGroup>
        <MultiRowCellGroup>
          <MultiRowCell header="国" binding="country" />
        </MultiRowCellGroup>
      </MultiRow>
    </>
  )
}
