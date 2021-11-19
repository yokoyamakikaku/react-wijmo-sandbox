import { useCallback, useMemo, useState } from 'react'
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

const defaultInputItems = [
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

function fruitTypeToLabel (type) {
  switch (type) {
    case FRUIT_TYPE.APPLE: return 'りんご'
    case FRUIT_TYPE.BANANA: return 'バナナ'
    case FRUIT_TYPE.CHERRY: return 'さくらんぼ'
    case FRUIT_TYPE.DAMSON: return 'ダムソン'
    default: return '不明な果物'
  }
}

function FruitTemplate ({ context }) {
  return fruitTypeToLabel(context.item.type)
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

function InputForm ({ values, onChange }) {
  const createChangeHandler = useCallback((key) => {
    return function hanleChange ({ target: { value } }) {
      onChange({
        ...values,
        [key]: value
      })
    }
  }, [values, onChange])

  return (
    <div style={{ fontSize: '2rem' }}>
      <div>
        <label>税率:</label>
        <input style={{ fontSize: '2rem' }} type="number" min={0} max={200} step={1} value={values.tax} onChange={createChangeHandler('tax')} />
        %
        {' '}
        <input type="range" value={values.tax} onChange={createChangeHandler('tax')} min={0} max={200} step={1} />
      </div>
      <div>
        <label>割引:</label>
        <input style={{ fontSize: '2rem' }} type="number" min={0} max={200} step={1} value={values.discount} onChange={createChangeHandler('discount')} />
        %
        {' '}
        <input type="range" value={values.discount} onChange={createChangeHandler('discount')} min={0} max={200} step={1} />
      </div>
    </div>
  )
}

function InputMultiRow ({ items, onChange }) {
  const collectionView = useCollectionView(items, {
    onCollectionChanged: function () {
      onChange([...this.items])
    }
  })

  const handleAddNew = useCallback(() => {
    const item = collectionView.addNew()
    item.type = FRUIT_TYPE.APPLE
    item.count = 0
    item.price = 0
    collectionView.commitNew()
  }, [collectionView])

  return (
    <>
      <button onClick={handleAddNew}>行を追加</button>
      <MultiRow itemsSource={collectionView} allowDelete>
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
          <MultiRowCell header="数量" binding="count" />
          <MultiRowCell header="価格" binding="price" />
        </MultiRowCellGroup>
      </MultiRow>
    </>
  )
}

function TotalMultiRow ({ items, tax, discount }) {
  const collectionView = useCollectionView(items)

  return (
    <MultiRow itemsSource={collectionView} isReadOnly>
      <MultiRowCellGroup colspan={5}>
        <MultiRowCell header="種類" binding="type">
          <MultiRowCellTemplate
            cellType={CellTemplateType.Cell}
            template={(context) => <FruitTemplate context={context} />} />
        </MultiRowCell>
        <MultiRowCell header="総数量" binding="count" />
        <MultiRowCell header="平均価格" binding="price" />
        <MultiRowCell header="割引後" binding="discounted" />
        <MultiRowCell header="税込み" binding="taxed" />
      </MultiRowCellGroup>
    </MultiRow>
  )
}

export default function MultiRowTotalling () {
  const [formValues, setFromValues] = useState({
    tax: 10,
    discount: 5
  })

  const [inputItems, setInputItems] = useState(defaultInputItems)

  const { tax, discount } = formValues
  const totalItems = useMemo(() => {
    return Object.values(inputItems.reduce((result, item) => {
      const { type, count, price } = item
      result[type] = result[type] || { type, count: 0, price: 0 }
      result[type].count += count
      result[type].price += count * price
      result[type].discounted = (result[type].price * (100 - discount) / 100).toFixed(2)
      result[type].taxed = (result[type].price * (100 - discount) / 100 * (100 + tax) / 100).toFixed(2)
      return result
    }, {}))
  }, [inputItems, discount, tax])

  return (
    <>
      <h1>複数のデータ用いたにした集計を表示するMultiRow</h1>
      <h2>入力フォーム</h2>
      <InputForm values={formValues} onChange={values => setFromValues(values)} />
      <h2>入力 MultiRow</h2>
      <InputMultiRow items={inputItems} onChange={items => setInputItems(items)} />
      <h2>集計 MultiRow</h2>
      税金: {formValues.tax}%, 割引: {formValues.discount}%
      <TotalMultiRow items={totalItems} />

      {totalItems.map((item) =>
        (item.discounted < 100 && (
          <p key={item.type}>
            <i>
            <b>{fruitTypeToLabel(item.type)}</b> が割引後 100 以下の値になっています
            </i>
          </p>
        ))
      )}
    </>
  )
}
