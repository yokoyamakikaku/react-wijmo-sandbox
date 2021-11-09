import { useRef } from 'react'
import { CollectionView } from '@grapecity/wijmo'
import {
  MultiRow,
  MultiRowCellGroup,
  MultiRowCell
} from '@grapecity/wijmo.react.grid.multirow'

const people = [
  {
    name: 'Yasir King',
    phone: '1-635-455-6889',
    email: 'montes.nascetur.ridiculus@hotmail.com',
    address: 'Ap #615-3489 Montes, St.',
    postalZip: 'J4R 6UM',
    region: 'Noord Holland',
    country: 'Germany',
    list: 7,
    text: 'Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non leo. Vivamus',
    numberrange: 3,
    currency: '$52.04',
    alphanumeric: 'DMK30UVS1ST'
  },
  {
    name: 'Macon Atkinson',
    phone: '(933) 552-3921',
    email: 'sed.hendrerit@yahoo.couk',
    address: '329 In St.',
    postalZip: '803578',
    region: 'Zhōngnán',
    country: 'Indonesia',
    list: 17,
    text: 'varius. Nam porttitor scelerisque neque. Nullam nisl. Maecenas malesuada fringilla',
    numberrange: 2,
    currency: '$88.52',
    alphanumeric: 'WHJ25UEU5GW'
  },
  {
    name: 'Grady Fischer',
    phone: '(474) 834-5829',
    email: 'risus@google.ca',
    address: '300-9886 Nulla Av.',
    postalZip: '6312',
    region: 'Podlaskie',
    country: 'Chile',
    list: 7,
    text: 'Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet',
    numberrange: 7,
    currency: '$56.67',
    alphanumeric: 'UCH85FUT6YV'
  },
  {
    name: 'Leroy Duncan',
    phone: '1-607-804-3253',
    email: 'ligula@aol.edu',
    address: 'P.O. Box 397, 4574 Vel, Avenue',
    postalZip: '77813',
    region: 'Utrecht',
    country: 'Belgium',
    list: 11,
    text: 'condimentum eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing',
    numberrange: 9,
    currency: '$39.97',
    alphanumeric: 'NPI51AER7JN'
  },
  {
    name: 'Vernon Hickman',
    phone: '(934) 829-5861',
    email: 'ante.iaculis@icloud.net',
    address: 'Ap #921-8900 Risus. Ave',
    postalZip: '84155',
    region: 'Rio Grande do Sul',
    country: 'Mexico',
    list: 1,
    text: 'ligula. Donec luctus aliquet odio. Etiam ligula tortor, dictum eu,',
    numberrange: 1,
    currency: '$88.74',
    alphanumeric: 'UHP93CGH8JO'
  }
]

export default function StructuredMultiRowExample () {
  const itemsSourceRef = useRef(new CollectionView(people))

  return (
    <>
      <h1>構造化されたMultiRow</h1>
      <MultiRow itemsSource={itemsSourceRef.current}>
        <MultiRowCellGroup colspan={1}>
          <MultiRowCell colspan={1} width={200} header="氏名" binding="name" />
        </MultiRowCellGroup>
        <MultiRowCellGroup header="連絡先" colspan={1}>
          <MultiRowCell colspan={1} header="電話番号" binding="phone" width={400} />
          <MultiRowCell colspan={1} header="メールアドレス" binding="email" width={400} />
        </MultiRowCellGroup>
        <MultiRowCellGroup header="住所" colspan={3}>
          <MultiRowCell colspan={1} header="国" binding="country" />
          <MultiRowCell colspan={1} header="地域" binding="region" />
          <MultiRowCell colspan={1} header="郵便番号" binding="postalZip" />
          <MultiRowCell colspan={3} header="住所" binding="email" />
        </MultiRowCellGroup>
        <MultiRowCellGroup header="その他" colspan={5}>
          <MultiRowCell width={100} colspan={1} header="リスト" binding="list" />
          <MultiRowCell width={320} colspan={1} header="文章" binding="text" />
          <MultiRowCell width={100} colspan={1} header="数字" binding="numberrange" />
          <MultiRowCell width={100} colspan={1} header="通貨" binding="currency" />
          <MultiRowCell width={100} colspan={1} header="英数字" binding="alphanumeric" />
        </MultiRowCellGroup>
      </MultiRow>
    </>
  )
}
