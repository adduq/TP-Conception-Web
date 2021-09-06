<template>
	<div class="page-search">
		<div class="columns is-multiline">
			<div class="column is-12">
				<h2 class="tile">Recherche</h2>

				<h3 class="is-size-5 has-text-grey">Termes: "{{ query }}"</h3>
			</div>

			<ProductBox
				v-for="product in products"
				v-bind:key="product.id"
				v-bind:product="product"
			/>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";
import ProductBox from "@/components/ProductBox";

export default {
	name: "Search",
	data() {
		return {
			products: [],
			query: "",
		};
	},
	components: {
		ProductBox,
	},
	mounted() {
		document.title = "Recherche | Djackets";

		let uri = window.location.search.substring(1);
		let params = new URLSearchParams(uri);

		if (params.get("query")) {
			this.query = params.get("query");

			this.performSearch();
		}
	},
	methods: {
		async performSearch() {
			this.$store.commit("setIsLoading", true);

			await axios
				.post("/api/v1/produits/search/", { query: this.query })
				.then((res) => {
					this.products = res.data;
				})
				.catch((err) => {
					console.log(err);

					toast({
						message: "Une erreur est survenue",
						type: "is-danger",
						dismissible: true,
						pauseOnHover: true,
						duration: 2000,
						position: "bottom-right",
					});
				});

			this.$store.commit("setIsLoading", false);
		},
	},
};
</script>
