import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import sortObjects from '../utils/sort'
import { shuffle } from '../utils/shuffle'
import { useSortOperation, executeOperation } from '../utils/operation'

function getRandomIndexes(max, count) {
  const indexes = new Set()
  while (indexes.size < count) {
    const index = Math.floor(Math.random() * max)
    if (index === 0) continue
    indexes.add(index)
  }
  return Array.from(indexes)
}

export const useSequenceStore = defineStore('sequenceStore', () => {

  // ─── State ───────────────────────────────────────────────────────────────
  const sequence        = ref([])   // itens visíveis (alguns são slots 'discover')
  const correctResponses = ref([])  // array paralelo: null ou id correto por índice
  const finalChoices    = ref([])   // opções disponíveis para o usuário escolher
  const selectedChoice  = ref(null) // opção atualmente selecionada pelo usuário { ...object }
  const countResponses  = ref(0)

  // ─── Getters ─────────────────────────────────────────────────────────────
  const pendingSlots = computed(() =>
    sequence.value
      .map((item, i) => ({ item, i }))
      .filter(({ item }) => item.object.name === 'discover')
  )

  const isComplete = computed(() =>
    pendingSlots.value.length === 0
  )

  // ─── Helpers ─────────────────────────────────────────────────────────────
  function buildDiscoverSlots(seq, numberDiscover, isSound = false) {
    const discoverCount  = Math.min(numberDiscover, seq.length)
    const randomIndexes  = getRandomIndexes(seq.length, discoverCount).sort((a, b) => a - b)
    const correct        = Array(seq.length).fill(null)

    for (const index of randomIndexes) {
      const chosen = seq[index]
      correct[index] = chosen.object.id

      seq[index].object = {
        ...seq[index].object,
        icon: 'mdi mdi-help',
        name: 'discover',
        ...(isSound ? { path: '/sounds/discover.mp3' } : {})
      }
    }

    return correct
  }

  // ─── Actions: montagem ───────────────────────────────────────────────────

  /** Para temas forms / sounds */
  function mountSequence(numberItens, timesRepeat, numberDiscover, arrayToSort) {
    const itenSequence = sortObjects(numberItens, arrayToSort)
    const isSound      = itenSequence.some(i => i.path !== undefined)
    const built        = []
    let idSeq          = 0

    for (let count = 0; count < timesRepeat / itenSequence.length; count++) {
      for (const item of itenSequence) {
        idSeq++
        built.push({ id: idSeq, object: { ...item } })
      }
    }

    correctResponses.value = buildDiscoverSlots(built, numberDiscover, isSound)
    sequence.value         = built
    finalChoices.value     = shuffle([...new Map(itenSequence.map(o => [o.id, o])).values()])
    selectedChoice.value   = null
    countResponses.value   = 0
  }

  /** Para o tema numbers */
  function mountNumberSequence(length, amountOperations, maxOperator, maxStart, numberDiscover) {
    if (length <= amountOperations) {
      console.error(`Tamanho de sequência (${length}) deve ser maior que a quantidade de operações (${amountOperations})`)
      return
    }

    const startNumber = Math.floor(Math.random() * maxStart) + 1
    const raw         = [startNumber]
    const { exportedOperations, operators } = useSortOperation(amountOperations, maxOperator)

    if (!exportedOperations.length) {
      console.error('Nenhuma operação foi gerada.')
      return
    }

    let opIndex = 0
    while (raw.length <= length) {
      if (opIndex >= exportedOperations.length) opIndex = 0
      raw.push(executeOperation(exportedOperations[opIndex], raw[raw.length - 1], operators[opIndex]))
      opIndex++
    }

    // Transforma numbers em objetos no mesmo formato que forms/sounds
    const built = raw.map((n, i) => ({
      id: i + 1,
      object: { id: n, name: String(n), icon: null, value: n }
    }))

    correctResponses.value = buildDiscoverSlots(built, numberDiscover)

    // Gera alternativas para os slots discover
    const correctValues = correctResponses.value
      .filter(v => v !== null)
      .map(id => raw.find(n => n === id) ?? id)

    const altSet = new Set(correctValues)
    const maxIter = 200
    let iter = 0
    while (altSet.size < Math.min(5, length) && iter < maxIter) {
      const base   = correctValues[Math.floor(Math.random() * correctValues.length)]
      const offset = Math.floor(Math.random() * 5) - 2
      const cand   = base + offset
      if (cand > 0) altSet.add(cand)
      iter++
    }

    sequence.value       = built
    finalChoices.value   = shuffle([...altSet].map(v => ({ id: v, name: String(v), icon: null, value: v })))
    selectedChoice.value = null
    countResponses.value = 0
  }

  // ─── Actions: interação ──────────────────────────────────────────────────

  /** Usuário clica em uma opção do painel de escolhas */
  function selectChoice(choiceObject) {
    // Toggle: clicar na já selecionada deseleciona
    if (selectedChoice.value?.id === choiceObject.id) {
      selectedChoice.value = null
    } else {
      selectedChoice.value = { ...choiceObject }
    }
  }

  /**
   * Usuário clica num slot 'discover' da sequência.
   * Só age se houver uma opção selecionada.
   * Retorna true se a resposta está correta, false se errada, null se ignorado.
   */
  function placeChoiceOnSlot(slotIndex) {
    if (!selectedChoice.value) return null

    const item = sequence.value[slotIndex]
    if (!item || item.object.name !== 'discover') return null

    const isCorrect = selectedChoice.value.id === correctResponses.value[slotIndex]

    // Revela o objeto no slot independente de certo/errado
    item.object = { ...selectedChoice.value }

    if (isCorrect) {
      countResponses.value++
    }

    selectedChoice.value = null
    return isCorrect
  }

  // ─── Reset ───────────────────────────────────────────────────────────────
  function reset() {
    sequence.value         = []
    correctResponses.value = []
    finalChoices.value     = []
    selectedChoice.value   = null
    countResponses.value   = 0
  }

  return {
    // state
    sequence,
    correctResponses,
    finalChoices,
    selectedChoice,
    countResponses,
    // getters
    pendingSlots,
    isComplete,
    // actions
    mountSequence,
    mountNumberSequence,
    selectChoice,
    placeChoiceOnSlot,
    reset
  }
})