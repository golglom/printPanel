
# 🖨️ PrintiPro – Système de gestion pour imprimerie

**PrintiPro** est une application web de gestion destinée aux entreprises du secteur de l'impression. Elle permet une gestion centralisée et efficace des matières premières, produits finis, clients, utilisateurs et inventaire.

🚀 Démo en ligne : [https://printipro.vercel.app](https://printipro.vercel.app)

---

## 📌 Fonctionnalités

- 📊 **Dashboard** : Vue d’ensemble des indicateurs clés (stock, produits, clients…)
- 🧱 **Matières premières** : Ajout, modification et suppression des ressources d’impression
- 📦 **Produits finis** :
  - Entrées (produits fabriqués)
  - Sorties (produits vendus ou livrés)
- 👥 **Clients** : Gestion de la base client
- 👤 **Utilisateurs** : Création et gestion des comptes utilisateurs
- 📈 **Inventaire** : Statistiques visuelles (graphique en barres, camemberts)

---

## 🛠️ Technologies utilisées

- **React.js** – Bibliothèque JavaScript pour l'interface
- **Vite** – Outil de build rapide
- **Tailwind CSS** – Framework CSS utilitaire
- **React Icons** – Icônes vectorielles
- **Structure des fichiers** :
  ```
  /components     -> Composants réutilisables (Header, Sidebar, Cards, etc.)
  /pages          -> Pages métiers (Dashboard, Matière, Produit, Client, etc.)
  /behaviors      -> Logique métier centralisée (ajout, suppression, édition…)
  /styles         -> Fichiers CSS (style global)
  /assets         -> Logos et ressources visuelles
  ```

---

## ⚙️ Installation locale

```bash
# 1. Cloner le dépôt
git clone https://github.com/tonutilisateur/printipro.git
cd printipro

# 2. Installer les dépendances
npm install

# 3. Lancer le projet en développement
npm run dev
```

---

## 🧩 Fonctionnalités à venir

- 🔐 Authentification avancée par rôle (admin / opérateur)
- 📦 Intégration backend avec Symfony 7
- 🧾 Génération de factures PDF
- 📤 Export des stocks en CSV/Excel

---

## 🎨 Thème & Design

- 🎨 Couleurs principales : **Noir & Jaune** – rappelant l’univers industriel de l’imprimerie
- 🌓 Mode sombre activé pour un meilleur confort visuel
- 📱 Responsive : compatible desktop, tablette, mobile

---

## 👤 Auteur

Développé par **DUMOGA Georges**  
📧 dumogageorges@gmail.com  
📍 Lomé, TOGO  
💼 Web Developer – Passionné par les outils de gestion sur mesure

---

## 📄 Licence

Ce projet est open source et distribué sous la licence [MIT](LICENSE).

---
