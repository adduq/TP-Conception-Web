<template>
	<div class="home">
		<section class="hero is-medium is-dark mb-6">
			<div class="hero-body has-text-centered">
				<p class="title mb-6">Bienvenue sur Djacket</p>
				<p class="subtitle">Le meilleur magasin de manteau.</p>
			</div>
		</section>

		<div class="columns is-multiline is-12">
			<div class="column is-12">
				<h2 class="is-size-2 has-text-centered">
					Dernier produit
				</h2>
			</div>

			<ProductBox
				v-for="product in latestProducts"
				v-bind:key="product.id"
				v-bind:product="product"
			/>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import ProductBox from "@/components/ProductBox";

export default {
	name: "Home",
	data() {
		return {
			latestProducts: [],
		};
	},
	components: {
		ProductBox,
	},
	mounted() {
		this.getLatestProducts();

		document.title = "Accueil | Djackets";
	},
	methods: {
		async getLatestProducts() {
			this.$store.commit("setIsLoading", true);

			await axios
				.get("/api/v1/dernier-produits/")
				.then((res) => {
					this.latestProducts = res.data;
				})
				.catch((err) => {
					console.log(err);
				});

			this.$store.commit("setIsLoading", false);
		},
	},
};
</script>
