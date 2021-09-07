from django.urls import path, include
from product import views

urlpatterns = [
    path('dernier-produits/', views.LatestProductsList.as_view()),
    path('produits/search/', views.search),
    path('produits/<slug:category_slug>/<slug:product_slug>/',
         views.ProductDetail.as_view()),
    path('produits/<slug:category_slug>/', views.CategoryDetail.as_view()),
]
