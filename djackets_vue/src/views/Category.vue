<template>
	<div class="page-category">
		<div class="columns is-multiline">
			<div class="column is-12">
				<h2 class="is-size-2 has-text-centered">{{ category.nom }}</h2>
			</div>

			<ProductBox
				v-for="product in category.products"
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
	name: "Category",
	data() {
		return {
			category: {
				products: [],
			},
		};
	},
	components: {
		ProductBox,
	},
	mounted() {
		this.getCategory();
	},
	watch: {
		$route(to, from) {
			if (to.name === "Category") {
				this.getCategory();
			}
		},
	},
	methods: {
		async getCategory() {
			this.$store.commit("setIsLoading", true);

			const category_slug = this.$route.params.category_slug;

			await axios
				.get(`/api/v1/produits/${category_slug}/`)
				.then((res) => {
					this.category = res.data;

					document.title = this.category.nom + " | Djackets";
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
