<template>
	<tr>
		<td>
			<router-link :to="item.product.get_absolute_url">{{
				item.product.nom
			}}</router-link>
		</td>
		<td>${{ item.product.prix }}</td>
		<td>
			<a @click="decrementQuantity(item)">-</a>
			{{ item.quantite }}
			<a @click="incrementQuantity(item)">+</a>
		</td>
		<td>${{ getItemTotal(item).toFixed(2) }}</td>
		<td><button class="delete" @click="removeFromCart(item)"></button></td>
	</tr>
</template>

<script>
export default {
	name: "CartItem",
	props: {
		initialItem: Object,
	},
	data() {
		return {
			item: this.initialItem,
		};
	},
	methods: {
		getItemTotal(item) {
			return item.quantite * item.product.prix;
		},
		decrementQuantity(item) {
			item.quantite -= 1;
			if (item.quantite === 0) {
				this.$emit("removeFromCart", item);
			}
			this.updateCart();
		},
		incrementQuantity(item) {
			item.quantite += 1;
			this.updateCart();
		},
		updateCart() {
			localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
		},
		removeFromCart(item) {
			this.$emit("removeFromCart", item);
			this.updateCart();
		},
	},
};
</script>
