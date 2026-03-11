<template>
  <header class="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between
                 bg-slate-950/80 backdrop-blur-md border-b border-white/5">

    <!-- Logo -->
    <RouterLink to="/" class="flex items-center gap-2.5 group">
      <div class="w-8 h-8 rounded-xl bg-linear-to-br from-violet-500 via-cyan-500 to-amber-500
                  flex items-center justify-center shadow-lg shadow-violet-500/20
                  group-hover:scale-110 transition-transform duration-300">
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707
               m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531
               c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      </div>
      <span class="text-white font-black tracking-tight text-lg leading-none">
        Mind<span class="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">Seq</span>
      </span>
    </RouterLink>

    <!-- Nav -->
    <nav class="hidden sm:flex items-center gap-1">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
               text-slate-400 hover:text-white hover:bg-white/8"
        active-class="text-white bg-white/10"
      >
        {{ item.label }}
      </RouterLink>
    </nav>

    <!-- Indicador de tema ativo (aparece dentro do jogo) -->
    <div v-if="activeTheme"
      class="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold"
      :class="themeChip[activeTheme]"
    >
      <span class="w-1.5 h-1.5 rounded-full animate-pulse" :class="themeDot[activeTheme]" />
      {{ themeLabel[activeTheme] }} · {{ difficultyLabel }}
    </div>
  </header>

  <!-- Espaçador para compensar o header fixo -->
  <div class="h-16.25" />
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { to: '/', label: 'Início' },
]

const activeTheme = computed(() =>
  ['forms', 'sounds', 'numbers'].includes(route.params.theme)
    ? route.params.theme
    : null
)

const difficultyLabel = computed(() => ({
  easy:   'Fácil',
  medium: 'Médio',
  hard:   'Difícil'
}[route.params.dificulty] ?? ''))

const themeLabel = {
  forms:   'Formas',
  sounds:  'Sons',
  numbers: 'Números'
}

const themeChip = {
  forms:   'border-violet-500/30 bg-violet-500/10 text-violet-300',
  sounds:  'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  numbers: 'border-amber-500/30 bg-amber-500/10 text-amber-300'
}

const themeDot = {
  forms:   'bg-violet-400',
  sounds:  'bg-cyan-400',
  numbers: 'bg-amber-400'
}
</script>