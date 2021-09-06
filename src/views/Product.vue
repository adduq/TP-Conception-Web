<template>
	<div class="page-product">
		<div class="columns is-multiline">
			<div class="column is-9">
				<figure class="image mb-6">
					<img v-bind:src="product.get_image" />
				</figure>
				<h1 class="title">{{ product.nom }}</h1>
				<p>{{ product.description }}</p>
			</div>

			<div class="column is-3">
				<h2 class="subtitle">Information</h2>
				<p><strong>Prix: </strong>{{ product.prix }} $</p>

				<div class="field has-addons mt-6">
					<div class="control">
						<input type="number" class="input" min="1" v-model="quantite" />
					</div>

					<div class="control">
						<a class="button is-dark" @click="addToCart">Ajouter au panier</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { toast } from "bulma-toast";

export default {
	name: "Product",
	data() {
		return {
			product: {},
			quantite: 1,
		};
	},
	mounted() {
		this.getProduct();
	},
	methods: {
		async getProduct() {
			this.$store.commit("setIsLoading", true);

			const category_slug = this.$route.params.category_slug;
			const product_slug = this.$route.params.product_slug;

			await axios
				.get(`/api/v1/produits/${category_slug}/${product_slug}`)
				.then((res) => {
					this.product = res.data;

					document.title = this.product.nom + " | Djackets";
				})
				.catch((err) => {
					console.log(err);
				});

			this.$store.commit("setIsLoading", false);
		},
		addToCart() {
			if (isNaN(this.quantite) || this.quantite < 1) {
				this.quantite = 1;
			}

			const item = {
				product: this.product,
				quantite: this.quantite,
			};

			this.$store.commit("addToCart", item);

			toast({
				message: "Le produit a été ajouté au panier",
				type: "is-success",
				dismissible: true,
				pauseOnHover: true,
				duration: 2000,
				position: "bottom-right",
			});
		},
	},
};
</script>
