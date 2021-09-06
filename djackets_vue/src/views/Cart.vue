<template>
	<div class="page-cart">
		<div class="columns is-multiline">
			<div class="column is-12">
				<h1 class="title">Panier</h1>
			</div>

			<div class="column is-12 box">
				<table class="table is-fullwidth" v-if="cartTotalLength">
					<thead>
						<tr>
							<th>Produit</th>
							<th>Prix</th>
							<th>Quantité</th>
							<th>Total</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						<CartItem
							v-for="item in cart.items"
							v-bind:key="item.product.id"
							v-bind:initialItem="item"
							v-on:removeFromCart="removeFromCart"
						/>
					</tbody>
				</table>

				<p v-else>Vous n'avez aucun produit dans votre panier...</p>
			</div>

			<div class="column is-12 box">
				<h2 class="subtitle">Résumé</h2>

				<strong>${{ cartTotalPrice.toFixed(2) }}</strong
				>, {{ cartTotalLength }} élément(s)

				<hr />

				<router-link to="/cart/checkout" class="button is-dark"
					>Procéder au paiement</router-link
				>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import CartItem from "@/components/CartItem.vue";

export default {
	name: "Cart",
	components: {
		CartItem,
	},
	data() {
		return {
			cart: {
				items: [],
			},
		};
	},
	mounted() {
		this.cart = this.$store.state.cart;
	},
	methods: {
		removeFromCart(item) {
			this.cart.items = this.cart.items.filter(
				(i) => i.product.id !== item.product.id
			);
		},
	},
	computed: {
		cartTotalLength() {
			return this.cart.items.reduce((acc, curVal) => {
				return (acc += curVal.quantite);
			}, 0);
		},
		cartTotalPrice() {
			return this.cart.items.reduce((acc, curVal) => {
				return (acc += curVal.product.prix * curVal.quantite);
			}, 0);
		},
	},
};
</script>
