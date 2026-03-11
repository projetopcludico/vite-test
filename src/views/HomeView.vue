<template>
  <div class="min-h-screen bg-slate-950 text-white overflow-x-hidden">

    <!-- Blobs de fundo -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 -left-32 w-72 h-72 bg-violet-600 rounded-full opacity-[0.07] blur-3xl" />
      <div class="absolute top-1/2 -right-32 w-72 h-72 bg-cyan-600 rounded-full opacity-[0.07] blur-3xl" />
      <div class="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-amber-600 rounded-full opacity-[0.07] blur-3xl" />
    </div>

    <div class="relative z-10 max-w-2xl mx-auto px-6 py-10 flex flex-col gap-12">

      <!-- Hero -->
      <section class="text-center space-y-4 pt-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-400 font-medium mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Treine sua memória sequencial
        </div>
        <h1 class="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
          Escolha um
          <span class="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-cyan-400 to-amber-400">
            desafio
          </span>
        </h1>
        <p class="text-slate-400 text-sm max-w-sm mx-auto leading-relaxed">
          Observe a sequência, descubra os elementos ocultos e preencha os espaços corretamente.
        </p>
      </section>

      <!-- Temas -->
      <section class="space-y-4">
        <div
          v-for="theme in themes"
          :key="theme.key"
          class="rounded-3xl border border-white/8 bg-white/3 overflow-hidden"
          :class="selectedTheme === theme.key ? 'ring-1 ' + theme.ring : ''"
        >
          <!-- Header do tema -->
          <button
            class="w-full flex items-center gap-4 p-5 text-left transition-colors hover:bg-white/5"
            @click="toggleTheme(theme.key)"
          >
            <!-- Ícone -->
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl"
              :class="theme.iconBg">
              {{ theme.emoji }}
            </div>

            <div class="flex-1 min-w-0">
              <p class="font-bold text-white">{{ theme.label }}</p>
              <p class="text-xs text-slate-400 mt-0.5">{{ theme.description }}</p>
            </div>

            <!-- Chevron -->
            <svg
              class="w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0"
              :class="selectedTheme === theme.key ? 'rotate-180' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- Dificuldades (expansível) -->
          <transition name="expand">
            <div v-if="selectedTheme === theme.key" class="px-5 pb-5">
              <div class="h-px bg-white/5 mb-4" />
              <p class="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-3">
                Selecione a dificuldade
              </p>
              <div class="grid grid-cols-3 gap-2">
                <RouterLink
                  v-for="diff in difficulties"
                  :key="diff.key"
                  :to="`/game/${theme.key}/${diff.key}`"
                  class="flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all duration-200 hover:scale-105 group"
                  :class="theme.diffBorder + ' hover:' + theme.diffHoverBg"
                >
                  <span class="text-lg">{{ diff.emoji }}</span>
                  <span class="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {{ diff.label }}
                  </span>
                  <div class="flex gap-0.5">
                    <span
                      v-for="i in diff.dots"
                      :key="i"
                      class="w-1.5 h-1.5 rounded-full"
                      :class="theme.dotColor"
                    />
                    <span
                      v-for="i in (3 - diff.dots)"
                      :key="'e' + i"
                      class="w-1.5 h-1.5 rounded-full bg-white/15"
                    />
                  </div>
                </RouterLink>
              </div>
            </div>
          </transition>
        </div>
      </section>

      <!-- Rodapé informativo -->
      <section class="grid grid-cols-3 gap-3 text-center">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl bg-white/3 border border-white/8 p-4"
        >
          <p class="text-2xl font-black">{{ stat.value }}</p>
          <p class="text-[11px] text-slate-500 mt-1">{{ stat.label }}</p>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const selectedTheme = ref(null)

function toggleTheme(key) {
  selectedTheme.value = selectedTheme.value === key ? null : key
}

const themes = [
  {
    key: 'forms',
    label: 'Formas',
    emoji: '⬡',
    description: 'Identifique e complete sequências de formas geométricas.',
    iconBg: 'bg-violet-500/15 text-violet-300',
    ring: 'ring-violet-500/30',
    diffBorder: 'border-violet-500/20 bg-violet-500/5',
    diffHoverBg: 'bg-violet-500/15',
    dotColor: 'bg-violet-400',
  },
  {
    key: 'sounds',
    label: 'Sons',
    emoji: '◎',
    description: 'Memorize sequências de sons e suas cores correspondentes.',
    iconBg: 'bg-cyan-500/15 text-cyan-300',
    ring: 'ring-cyan-500/30',
    diffBorder: 'border-cyan-500/20 bg-cyan-500/5',
    diffHoverBg: 'bg-cyan-500/15',
    dotColor: 'bg-cyan-400',
  },
  {
    key: 'numbers',
    label: 'Números',
    emoji: '∑',
    description: 'Descubra o padrão matemático e preencha os números corretos.',
    iconBg: 'bg-amber-500/15 text-amber-300',
    ring: 'ring-amber-500/30',
    diffBorder: 'border-amber-500/20 bg-amber-500/5',
    diffHoverBg: 'bg-amber-500/15',
    dotColor: 'bg-amber-400',
  }
]

const difficulties = [
  { key: 'easy',   label: 'Fácil',  emoji: '🌱', dots: 1 },
  { key: 'medium', label: 'Médio',  emoji: '🔥', dots: 2 },
  { key: 'hard',   label: 'Difícil', emoji: '⚡', dots: 3 },
]

const stats = [
  { value: '3',  label: 'Temas' },
  { value: '9',  label: 'Modos de jogo' },
  { value: '∞',  label: 'Sequências' },
]
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>