<template>
  <div class="min-h-screen bg-slate-950 text-white flex flex-col" :class="themeClass">

    <!-- Background decorativo -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl" :class="bgBlobClass" />
      <div class="absolute -bottom-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl" :class="bgBlobClass" />
    </div>

    <!-- Loading / Error -->
    <div v-if="!ready" class="flex-1 flex items-center justify-center">
      <div v-if="error" class="text-center space-y-3">
        <div class="text-5xl">⚠️</div>
        <p class="text-slate-300 text-lg">{{ error }}</p>
        <button @click="$router.back()" class="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition text-sm">
          Voltar
        </button>
      </div>
      <div v-else class="flex flex-col items-center gap-4">
        <div class="w-10 h-10 rounded-full border-4 border-white/20 border-t-white animate-spin" />
        <span class="text-slate-400 text-sm tracking-widest uppercase">Carregando...</span>
      </div>
    </div>

    <!-- Jogo -->
    <template v-else>

      <!-- Header -->
      <header class="relative z-10 px-6 pt-6 pb-4 flex items-center justify-between">
        <button @click="$router.back()" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <div class="text-center">
          <p class="text-xs uppercase tracking-widest text-slate-400 font-medium">{{ themeLabel }}</p>
          <p class="text-sm font-bold" :class="accentText">{{ difficultyLabel }}</p>
        </div>

        <!-- Placar -->
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10">
          <span class="text-xs text-slate-400">Acertos</span>
          <span class="text-lg font-black tabular-nums" :class="accentText">
            {{ sequenceStore.countResponses }}
          </span>
        </div>
      </header>

      <!-- Game text -->
      <div class="relative z-10 mx-6 mb-5 px-4 py-3 rounded-2xl bg-white/5 border border-white/10">
        <p class="text-xs text-slate-300 leading-relaxed">{{ gameText }}</p>
      </div>

      <!-- Sequência -->
      <main class="relative z-10 flex-1 flex flex-col gap-6 px-6 overflow-y-auto pb-6">

        <!-- Grid da sequência -->
        <div class="flex flex-wrap gap-3 justify-center">
          <div
            v-for="(item, index) in sequenceStore.sequence"
            :key="item.id"
            :class="[
              'relative flex flex-col items-center justify-center rounded-2xl transition-all duration-300 select-none',
              isDiscover(item)
                ? 'cursor-pointer border-2 border-dashed'
                : 'border border-white/10 bg-white/5',
              isDiscover(item) && sequenceStore.selectedChoice
                ? 'border-white/60 bg-white/10 scale-105 shadow-lg shadow-white/10'
                : isDiscover(item)
                ? 'border-white/25 bg-white/5'
                : '',
              theme === 'sounds' ? 'w-20 h-20' : 'w-16 h-16'
            ]"
            @click="handleSlotClick(index)"
          >
            <!-- Item revelado: forms -->
            <template v-if="theme === 'forms' && !isDiscover(item)">
              <i :class="[item.object.icon, 'text-3xl', accentText]" />
              <span class="text-[10px] mt-1 text-slate-400">{{ item.object.name }}</span>
            </template>

            <!-- Item revelado: sounds -->
            <template v-else-if="theme === 'sounds' && !isDiscover(item)">
              <div class="w-8 h-8 rounded-full" :style="{ backgroundColor: item.object.color }" />
              <span class="text-[10px] mt-1.5 text-center text-slate-300 leading-tight px-1">
                {{ item.object.name }}
              </span>
            </template>

            <!-- Item revelado: numbers -->
            <template v-else-if="theme === 'numbers' && !isDiscover(item)">
              <span class="text-2xl font-black tabular-nums" :class="accentText">
                {{ item.object.value ?? item.object.name }}
              </span>
            </template>

            <!-- Slot discover -->
            <template v-else>
              <div class="flex flex-col items-center gap-1 opacity-50">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-[9px] uppercase tracking-wider">?</span>
              </div>

              <!-- Pulsar quando selecionado -->
              <div v-if="sequenceStore.selectedChoice"
                class="absolute inset-0 rounded-2xl animate-ping opacity-20"
                :class="accentBg"
              />
            </template>

            <!-- Badge de acerto/erro temporário -->
            <transition name="badge">
              <div v-if="feedbackMap[index]"
                class="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                :class="feedbackMap[index] === 'correct' ? 'bg-emerald-500' : 'bg-rose-500'"
              >
                {{ feedbackMap[index] === 'correct' ? '✓' : '✗' }}
              </div>
            </transition>
          </div>
        </div>

        <!-- Divisor -->
        <div class="flex items-center gap-3">
          <div class="flex-1 h-px bg-white/10" />
          <span class="text-xs text-slate-500 uppercase tracking-widest">Escolha</span>
          <div class="flex-1 h-px bg-white/10" />
        </div>

        <!-- Opções (finalChoices) -->
        <div class="flex flex-wrap gap-3 justify-center">
          <button
            v-for="choice in sequenceStore.finalChoices"
            :key="choice.id"
            :class="[
              'flex flex-col items-center justify-center rounded-2xl px-4 py-3 transition-all duration-200 border-2 font-semibold select-none',
              isSelected(choice)
                ? `border-transparent scale-105 shadow-lg ${accentBg} text-white`
                : 'border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-slate-200'
            ]"
            @click="sequenceStore.selectChoice(choice)"
          >
            <!-- forms -->
            <template v-if="theme === 'forms'">
              <i :class="[choice.icon, 'text-2xl mb-1']" />
              <span class="text-xs">{{ choice.name }}</span>
            </template>

            <!-- sounds -->
            <template v-else-if="theme === 'sounds'">
              <div class="w-7 h-7 rounded-full mb-1" :style="{ backgroundColor: choice.color }" />
              <span class="text-xs">{{ choice.name }}</span>
            </template>

            <!-- numbers -->
            <template v-else>
              <span class="text-2xl tabular-nums">{{ choice.value ?? choice.name }}</span>
            </template>
          </button>
        </div>

        <!-- Tela de conclusão -->
        <transition name="complete">
          <div v-if="sequenceStore.isComplete"
            class="mt-4 rounded-3xl p-6 text-center space-y-4 border border-white/10"
            :class="accentBgLight"
          >
            <!-- Emoji muda conforme o contexto -->
            <div class="text-4xl">
              {{ isLastTheme && isLastDifficulty ? '🏆' : '🎉' }}
            </div>

            <div>
              <p class="text-xl font-black">Sequência completa!</p>
              <p class="text-slate-300 text-sm mt-1">
                Você acertou
                <strong :class="accentText">{{ sequenceStore.countResponses }}</strong> de
                <strong>{{ totalSlots }}</strong> slots.
              </p>
            </div>

            <!-- Tag de próximo destino -->
            <div v-if="nextRoute.isNextTheme"
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/8 border border-white/10 text-xs text-slate-400"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
              Novo tema desbloqueado
            </div>

            <!-- Botões -->
            <div class="flex flex-col gap-2 pt-1">
              <!-- Avançar / próximo tema -->
              <RouterLink
                :to="nextRoute.path"
                class="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm
                       transition-all hover:scale-105 text-white"
                :class="accentBg"
              >
                {{ nextRoute.label }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </RouterLink>

              <!-- Jogar novamente (sempre disponível) -->
              <button
                @click="restart"
                class="px-6 py-3 rounded-2xl font-semibold text-sm transition-all
                       hover:bg-white/10 text-slate-400 hover:text-white border border-white/10"
              >
                Jogar novamente
              </button>
            </div>
          </div>
        </transition>

      </main>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAplicationStore } from '../stores/aplication'
import { useSequenceStore } from '../stores/sequence'

const route = useRoute()
const router = useRouter()
const aplicationStore = useAplicationStore()
const sequenceStore = useSequenceStore()

const ready = ref(false)
const error = ref('')
const feedbackMap = reactive({})

// ─── Params da rota ────────────────────────────────────────────────────────
const theme      = computed(() => route.params.theme)
const difficulty = computed(() => route.params.dificulty)

// ─── Dados do tema/dificuldade ─────────────────────────────────────────────
const themeData = computed(() =>
  aplicationStore.aplication.themes[theme.value]
)

const difficultyData = computed(() =>
  themeData.value?.difficulties?.[difficulty.value]
)

const gameText = computed(() => difficultyData.value?.gameText ?? '')

const themeLabel = computed(() => ({
  forms: 'Formas',
  sounds: 'Sons',
  numbers: 'Números'
}[theme.value] ?? theme.value))

const difficultyLabel = computed(() => difficultyData.value?.title ?? difficulty.value)

const totalSlots = computed(() =>
  sequenceStore.correctResponses.filter(v => v !== null).length
)

// ─── Navegação de progressão ───────────────────────────────────────────────
const DIFFICULTIES = ['easy', 'medium', 'hard']
const THEMES       = ['forms', 'sounds', 'numbers']

const isLastDifficulty = computed(() => difficulty.value === 'hard')
const isLastTheme      = computed(() => theme.value === 'numbers')

const nextRoute = computed(() => {
  if (!isLastDifficulty.value) {
    // Próxima dificuldade, mesmo tema
    const nextDiff = DIFFICULTIES[DIFFICULTIES.indexOf(difficulty.value) + 1]
    return { path: `/game/${theme.value}/${nextDiff}`, label: `Avançar para ${({ easy: 'Médio', medium: 'Difícil' }[difficulty.value])}`, isNextTheme: false }
  }
  if (!isLastTheme.value) {
    // Próximo tema, dificuldade fácil
    const nextTheme = THEMES[THEMES.indexOf(theme.value) + 1]
    const nextThemeLabel = { sounds: 'Sons', numbers: 'Números' }[nextTheme]
    return { path: `/game/${nextTheme}/easy`, label: `Ir para ${nextThemeLabel}`, isNextTheme: true }
  }
  // Fim de tudo — volta para home
  return { path: '/', label: 'Voltar ao início', isNextTheme: false }
})

// ─── Classes de tema ───────────────────────────────────────────────────────
const themeClass = computed(() => ({
  forms:   'theme-forms',
  sounds:  'theme-sounds',
  numbers: 'theme-numbers'
}[theme.value] ?? ''))

const accentText = computed(() => ({
  forms:   'text-violet-400',
  sounds:  'text-cyan-400',
  numbers: 'text-amber-400'
}[theme.value] ?? 'text-white'))

const accentBg = computed(() => ({
  forms:   'bg-violet-500',
  sounds:  'bg-cyan-500',
  numbers: 'bg-amber-500'
}[theme.value] ?? 'bg-white'))

const accentBgLight = computed(() => ({
  forms:   'bg-violet-500/10',
  sounds:  'bg-cyan-500/10',
  numbers: 'bg-amber-500/10'
}[theme.value] ?? 'bg-white/10'))

const bgBlobClass = computed(() => ({
  forms:   'bg-violet-600',
  sounds:  'bg-cyan-600',
  numbers: 'bg-amber-600'
}[theme.value] ?? 'bg-slate-600'))

// ─── Helpers ───────────────────────────────────────────────────────────────
function isDiscover(item) {
  return item.object.name === 'discover'
}

function isSelected(choice) {
  return sequenceStore.selectedChoice?.id === choice.id
}

// ─── Interação ─────────────────────────────────────────────────────────────
function handleSlotClick(index) {
  if (!sequenceStore.selectedChoice) return

  const result = sequenceStore.placeChoiceOnSlot(index)

  if (result === null) return

  feedbackMap[index] = result ? 'correct' : 'wrong'
  setTimeout(() => { delete feedbackMap[index] }, 1200)
}

// ─── Montagem do jogo ──────────────────────────────────────────────────────
function mountGame() {
  const themeD = themeData.value
  const diffD  = difficultyData.value

  if (!themeD || !diffD) {
    error.value = `Tema "${theme.value}" ou dificuldade "${difficulty.value}" não encontrado.`
    ready.value = true
    return
  }

  const { params } = diffD

  if (theme.value === 'numbers') {
    sequenceStore.mountNumberSequence(
      params.size,
      params.numberOperations,
      10,   // maxOperator
      20,   // maxStart
      params.discover
    )
  } else {
    sequenceStore.mountSequence(
      params.numberObj,
      params.size,
      params.discover,
      themeD.objects
    )
  }

  aplicationStore.setDificulty(difficulty.value)
  ready.value = true
}

function restart() {
  ready.value = false
  setTimeout(mountGame, 100)
}

onMounted(mountGame)

watch(
  () => [route.params.theme, route.params.dificulty],
  () => {
    ready.value = false
    error.value = ''
    setTimeout(mountGame, 100)
  }
)
</script>

<style scoped>
.badge-enter-active,
.badge-leave-active { transition: all 0.25s ease; }
.badge-enter-from   { opacity: 0; transform: scale(0.4); }
.badge-leave-to     { opacity: 0; transform: scale(0.4); }

.complete-enter-active { transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
.complete-enter-from   { opacity: 0; transform: translateY(20px) scale(0.95); }
</style>