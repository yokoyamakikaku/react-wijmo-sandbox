import { useCallback, useRef } from 'react'
import { CollectionView } from '@grapecity/wijmo'
import { CellTemplateType } from '@grapecity/wijmo.react.grid'
import {
  MultiRow,
  MultiRowCellGroup,
  MultiRowCell,
  MultiRowCellTemplate
} from '@grapecity/wijmo.react.grid.multirow'

const FRUIT_TYPE = Object.freeze({
  APPLE: 'apple',
  BANANA: 'banana',
  CHERRY: 'cherry',
  DAMSON: 'damson'
})

const defaultValues = [
  {
    type: FRUIT_TYPE.APPLE,
    count: 1,
    price: 100
  }, {
    type: FRUIT_TYPE.APPLE,
    count: 5,
    price: 75
  }, {
    type: FRUIT_TYPE.DAMSON,
    count: 5,
    price: 2000
  }
]

function FruitTemplate ({ context }) {
  switch (context.item.type) {
    case FRUIT_TYPE.APPLE: return 'りんご'
    case FRUIT_TYPE.BANANA: return 'バナナ'
    case FRUIT_TYPE.CHERRY: return 'さくらんぼ'
    case FRUIT_TYPE.DAMSON: return 'ダムソン'
    default: return '不明な果物'
  }
}

function updateTotalCollectionView (totalCollectionView, inputItems) {
  while (totalCollectionView.items.length > 0) {
    totalCollectionView.removeAt(0)
  }

  Object.values(inputItems.reduce((result, item) => {
    const { type, count, price } = item
    result[type] = result[type] || { type, count: 0, price: 0 }
    result[type].count += count
    result[type].price += count * price
    return result
  }, {})).forEach(({ type, count, price }) => {
    const item = totalCollectionView.addNew()
    item.type = type
    item.count = count
    item.price = price
    totalCollectionView.commitNew()
  })
}

export default function MultiRowTotalling () {
  const totalItemsSourceRef = useRef(new CollectionView())
  const inputItemsSourceRef = useRef((() => {
    const collectionView = new CollectionView(defaultValues)

    collectionView.collectionChanged.addHandler(function () {
      updateTotalCollectionView(totalItemsSourceRef.current, this.items)
    }, collectionView)
    updateTotalCollectionView(totalItemsSourceRef.current, collectionView.items)

    return collectionView
  })())

  const handleAddNew = useCallback(() => {
    const collectionView = inputItemsSourceRef.current
    const item = collectionView.addNew()
    item.type = FRUIT_TYPE.APPLE
    item.count = 0
    item.price = 0
    collectionView.commitNew()
  }, [])

  return (
    <>
      <h1>集計を用いたMultiRow</h1>
      <h2>入力</h2>
      <button onClick={handleAddNew}>行を追加</button>
      <MultiRow itemsSource={inputItemsSourceRef.current} allowDelete>
        <MultiRowCellGroup colspan={3}>
          <MultiRowCell header="種別" binding="type">
            <MultiRowCellTemplate
              cellType={CellTemplateType.Cell}
              template={(context) => <FruitTemplate context={context} />} />
            <MultiRowCellTemplate
              cellType={CellTemplateType.CellEdit}
              template={(context) => {
                return (
                  <select defaultValue={context.value} onChange={({ target: { value } }) => {
                    context.value = value
                  }}>
                    <option value={FRUIT_TYPE.APPLE}>りんご</option>
                    <option value={FRUIT_TYPE.BANANA}>バナナ</option>
                    <option value={FRUIT_TYPE.CHERRY}>さくらんぼ</option>
                    <option value={FRUIT_TYPE.DAMSON}>ダムソン</option>
                  </select>
                )
              }} />
          </MultiRowCell>
          <MultiRowCell header="価格" binding="price" />
          <MultiRowCell header="数量" binding="count" />
        </MultiRowCellGroup>
      </MultiRow>
      <h2>集計</h2>
      <MultiRow itemsSource={totalItemsSourceRef.current} isReadOnly>
        <MultiRowCellGroup colspan={3}>
          <MultiRowCell header="種類" binding="type">
            <MultiRowCellTemplate
              cellType={CellTemplateType.Cell}
              template={(context) => <FruitTemplate context={context} />} />
          </MultiRowCell>
          <MultiRowCell header="価格" binding="price" />
          <MultiRowCell header="数量" binding="count" />
        </MultiRowCellGroup>
      </MultiRow>
    </>
  )
}
