import { useState } from 'react'

import { Link } from 'react-router-dom'

import Layout from '../components/Layout'

import '../styles/recipes.css'

const recipes = [
  {
    id: 'spinach-ricotta-ravioli',
    pastaId: 9,
    name: 'Spinach and ricotta ravioli',
    image: '/spinachandravioli.jpg',
    description: 'From scratch',
    time: '90 min',
    servings: '4 servings',
    doneness: 'Firm',

    ingredients: [
      '300 g flour (all-purpose or 00)',
      '3 large eggs',
      '250 g ricotta',
      '200 g fresh spinach',
      '40 g grated Parmesan',
      '60 g butter',
      'sage leaves',
    ],

    steps: [
      'Make and rest the dough.',
      'Wilt, squeeze and mix the spinach filling.',
      'Roll sheets, fill and seal the ravioli.',
      'Boil until they float, about 3–4 minutes.',
      'Finish with butter, sage and Parmesan.',
    ],
  },

  {
    id: 'carbonara',
    name: 'Carbonara',
    image: '/carbonara-authentic.jpg',
    description: 'Authentic, no cream',
    time: '25 min',
    servings: '4 servings',
    doneness: 'Al dente',

    ingredients: [
      '400 g spaghetti or rigatoni',
      '150 g guanciale (or pancetta)',
      '4 large egg yolks + 1 whole egg',
      '100 g Pecorino Romano, finely grated',
      'Freshly cracked black pepper',
    ],

    steps: [
      'Crisp the diced guanciale in a pan over medium heat until golden; remove from heat.',
      'Whisk egg yolks, whole egg, Pecorino Romano, and black pepper together in a bowl.',
      'Boil pasta in salted water until al dente, reserving 1/2 cup of pasta water.',
      'Add pasta directly to the pan with guanciale off the heat.',
      'Pour in the egg mixture while tossing rapidly, adding reserved pasta water as needed to create a glossy sauce.',
    ],
  },

  {
    id: 'carbonara-filipino',
    name: 'Carbonara',
    image: '/carbonara.jpg',
    description: 'With cream (Filipino style)',
    time: '25 min',
    servings: '4 servings',
    doneness: 'Al dente',

    ingredients: [
      '400 g fettuccine or spaghetti',
      '200 g bacon, chopped',
      '1 small onion, minced',
      '3 cloves garlic, minced',
      '1 cup heavy cream or all-purpose cream',
      '1/2 cup grated cheddar or Parmesan',
      'Salt and black pepper to taste',
    ],

    steps: [
      'Boil pasta in salted water until al dente; drain and set aside.',
      'Fry chopped bacon in a skillet until crisp, then set aside some for topping.',
      'Sauté minced onion and garlic in the bacon render until fragrant.',
      'Pour in the cream and grated cheese, simmering gently on low heat until slightly thickened.',
      'Toss the cooked pasta into the sauce and garnish with crisp bacon.',
    ],
  },

  {
    id: 'lasagna',
    name: 'Lasagna',
    image: '/lasagna.jpg',
    description: 'Classic, with ragù and béchamel',
    time: '180 min',
    servings: '6 servings',
    doneness: 'Al dente',

    ingredients: [
      '12–15 lasagna sheets',
      '500 g ground beef & pork mix',
      '1 onion, 1 carrot, 1 celery stick (finely diced)',
      '800 g crushed canned tomatoes',
      '1/2 cup red wine',
      '50 g butter & 50 g flour (for béchamel)',
      '500 ml whole milk',
      '150 g grated Parmesan & 200 g mozzarella',
    ],

    steps: [
      'Simmer onion, carrot, celery, ground meat, red wine, and crushed tomatoes for 2 hours to make the ragù.',
      'Melt butter, whisk in flour, and gradually add milk over medium heat to create the béchamel sauce.',
      'Layer ragù, béchamel, pasta sheets, and cheeses in a baking dish.',
      'Repeat layers until filled, finishing with béchamel and cheese on top.',
      'Bake at 180°C (350°F) for 40–45 minutes until golden and bubbling.',
    ],
  },

  {
    id: 'pesto',
    name: 'Pesto pasta',
    image: '/pesto.jpg',
    description: 'Basil and Parmesan',
    time: '20 min',
    servings: '4 servings',
    doneness: 'Al dente',

    ingredients: [
      '400 g trofie, fusilli, or spaghetti',
      '2 cups fresh basil leaves',
      '50 g pine nuts (toasted)',
      '2 cloves garlic',
      '60 g grated Parmesan',
      '1/2 cup extra virgin olive oil',
      'Pinch of coarse salt',
    ],

    steps: [
      'Blend basil leaves, toasted pine nuts, garlic, and coarse salt in a food processor or mortar.',
      'Drizzle in olive oil slowly while blending until smooth.',
      'Stir in the freshly grated Parmesan cheese.',
      'Boil pasta in salted water until al dente, reserving 1/4 cup cooking water.',
      'Toss warm pasta with the pesto sauce off heat, loosening with pasta water if needed.',
    ],
  },

  {
    id: 'filipino-spaghetti',
    name: 'Filipino spaghetti',
    image: '/filipino-spaghetti.jpg',
    description: 'Sweet-style',
    time: '45 min',
    servings: '6 servings',
    doneness: 'Al dente',

    ingredients: [
      '500 g spaghetti noodles',
      '500 g ground pork or beef',
      '4 red hotdogs, sliced diagonally',
      '1 onion & 4 cloves garlic, minced',
      '1/2 cup sweet-style spaghetti sauce',
      '1/2 cup banana ketchup',
      '1 cup shredded quick-melt cheddar cheese',
    ],

    steps: [
      'Boil spaghetti noodles according to package directions; drain.',
      'Sauté garlic and onion, then add ground meat and cook until browned.',
      'Add sliced hotdogs and stir for 2–3 minutes.',
      'Pour in sweet spaghetti sauce and banana ketchup, then simmer for 20 minutes.',
      'Serve sauce over pasta and top generously with shredded cheese.',
    ],
  },

  {
    id: 'pomodoro',
    name: 'Spaghetti al pomodoro',
    image: '/pomodoro.jpg',
    description: 'Italian',
    time: '30 min',
    servings: '4 servings',
    doneness: 'Al dente',

    ingredients: [
      '400 g spaghetti',
      '800 g whole peeled San Marzano tomatoes',
      '3 tbsp extra virgin olive oil',
      '2 cloves garlic, peeled and smashed',
      '1 handful fresh basil leaves',
      'Freshly grated Parmesan cheese',
    ],

    steps: [
      'Gently heat olive oil and smashed garlic cloves in a wide skillet until fragrant, then remove garlic.',
      'Crush San Marzano tomatoes by hand into the oil and simmer for 20 minutes.',
      'Boil spaghetti in salted water until 2 minutes short of al dente.',
      'Transfer pasta into tomato sauce with torn fresh basil leaves and toss over medium heat.',
      'Finish with a generous drizzle of olive oil and grated Parmesan.',
    ],
  },

  {
    id: 'sopas',
    name: 'Sopas (Chicken Macaroni Soup)',
    image: '/sopas.jpg',
    description: 'Filipino comfort food',
    time: '45 min',
    servings: '6 servings',
    doneness: 'Al dente',

    ingredients: [
      '250 g elbow macaroni',
      '300 g chicken breast or thighs',
      '1 cup evaporated milk',
      '1 medium carrot, diced',
      '1/2 head small cabbage, shredded',
      '1 onion & 3 cloves garlic, minced',
      '6 cups chicken broth or water',
      '1 tbsp fish sauce (patis)',
    ],

    steps: [
      'Boil chicken until cooked, shred meat, and reserve the broth.',
      'Sauté garlic and onion, add shredded chicken, and season with fish sauce.',
      'Pour in chicken broth and bring to a simmer.',
      'Add elbow macaroni and carrots; cook until pasta is tender.',
      'Stir in shredded cabbage and evaporated milk, simmer for 2 minutes, and serve warm.',
    ],
  },
]

function RecipeCard({
  recipe,
  expanded,
  onToggle,
}) {
  return (
    <article
      className={
        expanded
          ? 'recipe-card recipe-card-expanded'
          : 'recipe-card'
      }
    >
      <div className="recipe-card-top">
        <div className="recipe-image-box">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="recipe-image"
          />
        </div>

        <div className="recipe-summary">
          <h2>{recipe.name}</h2>

          <span className="recipe-tag">
            Uses pasta
          </span>

          <p className="recipe-meta">
            {recipe.description} · {recipe.time} ·{' '}
            {recipe.servings}
          </p>

          <p className="recipe-doneness">
            Recommended doneness:{' '}
            <strong>{recipe.doneness}</strong>
          </p>
        </div>

        <button
          type="button"
          className="recipe-toggle"
          onClick={() => onToggle(recipe.id)}
        >
          {expanded
            ? 'Hide recipe'
            : 'Show recipe'}
        </button>
      </div>

      {expanded && (
        <div className="recipe-expanded">
          <div className="recipe-divider" />

          <div className="recipe-details">
            <section className="recipe-section">
              <h3>Ingredients</h3>

              <ul>
                {recipe.ingredients.map(
                  (ingredient) => (
                    <li key={ingredient}>
                      {ingredient}
                    </li>
                  ),
                )}
              </ul>
            </section>

            <section className="recipe-section">
              <h3>Steps</h3>

              <ol>
                {recipe.steps.map(
                  (step) => (
                    <li key={step}>
                      {step}
                    </li>
                  ),
                )}
              </ol>
            </section>
          </div>

          {recipe.pastaId && (
            <div className="recipe-actions">
              <Link
                to={`/cook/${recipe.pastaId}`}
                className="cook-button"
              >
                Cook this pasta
              </Link>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export default function Recipes() {
  const [openRecipe, setOpenRecipe] =
    useState(null)

  function handleToggle(id) {
    setOpenRecipe((current) =>
      current === id ? null : id,
    )
  }

  return (
    <Layout>
      <div className="recipes-page">
        <section className="recipes-container">
          <h1>Recipes</h1>

          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                expanded={
                  openRecipe === recipe.id
                }
                onToggle={handleToggle}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  )
}