import { useCallback, useState, useMemo } from 'react'
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

const DEFAULT_INPUT_SOURCE = [
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

function useCollectionView (sourceCollection, {
  onCollectionChanged,
  onCurrentChanged,
  onCurrentChanging,
  onPageChanged,
  onPageChanging,
  onSourceCollectionChanged,
  onSourceCollectionChanging
} = {}) {
  return useMemo(() => {
    const collectionView = new CollectionView(sourceCollection)

    onCollectionChanged && collectionView.collectionChanged.addHandler(onCollectionChanged, collectionView)
    onCurrentChanged && collectionView.currentChanged.collectionChanged.addHandler(onCurrentChanged, collectionView)
    onCurrentChanging && collectionView.currentChanging.collectionChanged.addHandler(onCurrentChanging, collectionView)
    onPageChanged && collectionView.pageChanged.collectionChanged.addHandler(onPageChanged, collectionView)
    onPageChanging && collectionView.pageChanging.collectionChanged.addHandler(onPageChanging, collectionView)
    onSourceCollectionChanged && collectionView.sourceCollectionChanged.collectionChanged.addHandler(onSourceCollectionChanged, collectionView)
    onSourceCollectionChanging && collectionView.sourceCollectionChanging.collectionChanged.addHandler(onSourceCollectionChanging, collectionView)

    return collectionView
  }, [sourceCollection])
}

export default function MultiRowTotalling () {
  const [inputItemSource, setInputItemSource] = useState([...DEFAULT_INPUT_SOURCE])
  const totalItemSource = useMemo(() => {
    return Object.values(inputItemSource.reduce((result, item) => {
      const { type, count, price } = item
      result[type] = result[type] || { type, count: 0, price: 0 }
      result[type].count += count
      result[type].price += count * price
      return result
    }, {}))
  }, [inputItemSource])

  const inputCollectionView = useCollectionView(inputItemSource, {
    onCollectionChanged: function () {
      setInputItemSource([...this.items])
    }
  })

  const totalCollectionView = useCollectionView(totalItemSource)

  const handleAddNew = useCallback(() => {
    const collectionView = inputCollectionView
    const item = collectionView.addNew()
    item.type = FRUIT_TYPE.APPLE
    item.count = 0
    item.price = 0
    collectionView.commitNew()
  }, [inputCollectionView])

  return (
    <>
      <h1>集計を用いたMultiRow</h1>
      <h2>入力</h2>
      <p>
        <button onClick={handleAddNew}>行を追加</button>
      </p>
      <MultiRow itemsSource={inputCollectionView} allowDelete>
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
      <MultiRow itemsSource={totalCollectionView} isReadOnly>
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
