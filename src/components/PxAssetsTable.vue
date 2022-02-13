<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ up: this.sortOrder == 1, down: this.sortOrder == -1 }">
          <span class="underline cursor-pointer" @click="changeSortOrder"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filter"
            placeholder="Buscar..."
            type="text"
            v-model="filter"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="coin in filteredAssets"
        :key="coin.id"
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
      >
        <td>
          <img
            class="w-6 h-6"
            :src="`https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`"
            :alt="coin.name"
          />
        </td>
        <td>
          <b>#{{ coin.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            :to="{ name: 'coin-detail', params: { id: coin.id } }"
          >
            {{ coin.name }}
          </router-link>
          <small class="ml-1 text-gray-500">
            {{ coin.symbol }}
          </small>
        </td>
        <td>{{ dollarFilter(coin.priceUsd) }}</td>
        <td>{{ dollarFilter(coin.marketCapUsd) }}</td>
        <td
          :class="
            coin.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ percentFilter(coin.changePercent24Hr) }}
        </td>
        <td class="hidden sm:block">
          <px-button @custom-click="goToCoin(coin.id)">
            <span>Detalle</span>
          </px-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import PxButton from "@/components/PxButton";
import { dollarFilter, percentFilter } from "@/filters";

export default {
  name: "PxAssetsTable",
  components: { PxButton },
  data() {
    return {
      filter: "",
      sortOrder: 1,
    };
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    dollarFilter,
    percentFilter,
    goToCoin(idCoin) {
      this.$router.push({ name: "coin-detail", params: { id: idCoin } });
    },
    changeSortOrder() {
      this.sortOrder = this.sortOrder == 1 ? -1 : 1;
    },
  },

  computed: {
    filteredAssets() {
      const altOrder = this.sortOrder == 1 ? -1 : 1;

      return this.assets
        .filter(
          (asset) =>
            asset.symbol.toLowerCase().includes(this.filter.toLowerCase()) ||
            asset.name.toLowerCase().includes(this.filter.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) {
            return this.sortOrder;
          }
          return altOrder;
        });
    },
  },
};
</script>

<style scoped>
.up::before {
  content: "👆";
}

.down::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
