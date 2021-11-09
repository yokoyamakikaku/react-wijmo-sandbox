import { useEffect, useState, useRef } from 'react'
import { CollectionView } from '@grapecity/wijmo'
import {
  MultiRow,
  MultiRowCellGroup,
  MultiRowCell
} from '@grapecity/wijmo.react.grid.multirow'

export function PokemonMultiRow ({ pokemons }) {
  const itemSourceRef = useRef(new CollectionView(pokemons))
  return (
    <MultiRow itemsSource={itemSourceRef.current}>
      <MultiRowCellGroup>
        <MultiRowCell header="名前" binding="name" />
      </MultiRowCellGroup>
      <MultiRowCellGroup>
        <MultiRowCell header="重さ" binding="weight" />
      </MultiRowCellGroup>
      <MultiRowCellGroup>
        <MultiRowCell header="高さ" binding="height" />
      </MultiRowCellGroup>
    </MultiRow>
  )
}

export default function MultiRowAsyncResourceExample () {
  const [type, setType] = useState('')
  const [types, setTypes] = useState([])
  const [pokemons, setPokemons] = useState(null)

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type')
      const { results: types } = await response.json()
      setTypes(types)
    }
    fetchTypes()
  }, [])

  useEffect(() => {
    const fetchPokemons = async (type) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?type=${type}`)
      const { results: pokemons } = await response.json()

      for (const index in pokemons) {
        const response = await fetch(pokemons[index].url)
        const pokemon = await response.json()
        pokemons[index] = pokemon
      }

      setPokemons(pokemons)
    }

    if (!type) return
    setPokemons(null)
    fetchPokemons(type)
  }, [type])

  return (
    <>
      <h1>非同期で取得したデータを用いたMultiRow</h1>
      <div>
        <span>type: </span>
        <select value={type} onChange={({ target: { value } }) => setType(value)}>
          <option value="">選んでください</option>
          {types.map(type =>
            <option key={type.name} value={type.name}>{type.name}</option>
          )}
        </select>
        {pokemons && <PokemonMultiRow pokemons={pokemons} />}
      </div>

    </>
  )
}
