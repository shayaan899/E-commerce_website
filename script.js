// 1. Placeholder data arrays
const images = [
  'assets/tshirt-1.png',
  'assets/tshirt-2.png',
  'assets/tshirt-3.png',
  'assets/tshirt-4.png',
  'assets/tshirt-5.png'
];
const colors = ['black','red','blue','green','grey'];
const recommendations = [
  { img: 'assets/hat.png',   title: 'Cool Hat',      price: '$29.00' },
  { img: 'assets/belt.png',  title: 'Leather Belt',  price: '$19.00' },
  { img: 'assets/socks.png', title: 'Ankle Socks',   price: '$9.00'  }
];
const bundleItems = [
  { img: 'assets/tshirt-2.png', title: 'Matching T-Shirt', price: '$99.00' },
  { img: 'assets/jeans.png',    title: 'Denim Jeans',      price: '$59.00' }
];
const related = [
  { img: 'assets/rel1.png', title: 'Item A', price: '$49.00', badge: 'New'     },
  { img: 'assets/rel2.png', title: 'Item B', price: '$39.00', badge: 'Popular' },
  { img: 'assets/rel3.png', title: 'Item C', price: '$59.00', badge: ''        },
  { img: 'assets/rel4.png', title: 'Item D', price: '$19.00', badge: ''        }
];

// 2. Scrollable thumbnail gallery
const mainImg        = document.getElementById('product-main-image');
const thumbContainer = document.getElementById('thumb-container');
images.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('thumbnail');
  img.onclick = () => mainImg.src = src;
  thumbContainer.appendChild(img);
});

// 3. Size Chart Modal
const sizeBtn    = document.getElementById('size-chart-btn');
const sizeModal  = document.getElementById('size-chart-modal');
const sizeClose  = document.getElementById('size-chart-close');
sizeBtn.addEventListener('click', () => sizeModal.classList.remove('hidden'));
sizeClose.addEventListener('click', () => sizeModal.classList.add('hidden'));
sizeModal.querySelector('.modal-overlay').addEventListener('click', () => sizeModal.classList.add('hidden'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') sizeModal.classList.add('hidden');
});

// 4. Color Swatches & persistence
const swatchContainer = document.getElementById('swatch-container');
colors.forEach(color => {
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = 'color';
  input.id   = color;
  const label = document.createElement('label');
  label.htmlFor = color;
  label.classList.add('swatch', color);
  swatchContainer.append(input, label);
  input.addEventListener('change', () => {
    mainImg.src = `assets/tshirt-${color}.png`;
    localStorage.setItem('selectedColor', color);
  });
});
const storedColor = localStorage.getItem('selectedColor');
if (storedColor) {
  const el = document.getElementById(storedColor);
  if (el) el.checked = true;
}

// 5. Compare Colours Modal (fully functional)
const compareBtn    = document.getElementById('compare-colors-btn');
const compareModal  = document.getElementById('compare-colors-modal');
const compareClose  = document.getElementById('compare-colors-close');
const doCompareBtn  = document.getElementById('do-compare');
const swatchesDiv   = document.getElementById('compare-swatches');
const compareResult = document.getElementById('compare-result');

compareBtn.addEventListener('click', () => {
  swatchesDiv.innerHTML = '';
  compareResult.innerHTML = '';
  colors.forEach(color => {
    const sw = document.createElement('div');
    sw.classList.add('swatch', color);
    sw.dataset.color = color;
    sw.addEventListener('click', () => sw.classList.toggle('selected'));
    swatchesDiv.appendChild(sw);
  });
  compareModal.classList.remove('hidden');
});

compareClose.addEventListener('click', () => compareModal.classList.add('hidden'));
compareModal.querySelector('.modal-overlay')
            .addEventListener('click', () => compareModal.classList.add('hidden'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') compareModal.classList.add('hidden');
});

doCompareBtn.addEventListener('click', () => {
  compareResult.innerHTML = '';
  const selected = swatchesDiv.querySelectorAll('.swatch.selected');
  if (selected.length < 2) {
    alert('Please select at least two colours to compare.');
    return;
  }
  selected.forEach(sw => {
    const c = sw.dataset.color;
    const clone = document.createElement('div');
    clone.classList.add('swatch', c);
    compareResult.appendChild(clone);
  });
});

// 6. Recommendations Carousel
const recContainer = document.getElementById('recommendations');
recommendations.forEach(p => {
  const card = document.createElement('div');
  card.className = 'rec-card';
  card.innerHTML = `
    <img src="${p.img}" alt="${p.title}" />
    <h5>${p.title}</h5>
    <p>${p.price}</p>
    <button>Add</button>
  `;
  recContainer.appendChild(card);
});

// 7. Bundle Suggestion
const bundleContainer = document.getElementById('bundle-cards');
const totalSpan       = document.getElementById('bundle-total');
let total = 0;
bundleItems.forEach(item => {
  const card = document.createElement('div');
  card.className = 'bundle-card';
  card.innerHTML = `
    <img src="${item.img}" alt="${item.title}" />
    <h5>${item.title}</h5>
    <p>${item.price}</p>
  `;
  bundleContainer.appendChild(card);
  total += parseFloat(item.price.replace('$',''));
});
totalSpan.textContent = `Total: $${total.toFixed(2)}`;
document.getElementById('add-bundle')
        .addEventListener('click', () => alert('Bundle added to cart!'));

// 8. Tabs functionality
const tabs     = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(b => b.classList.remove('active'));
    contents.forEach(c => c.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.remove('hidden');
  });
});

// 9. Related Products Grid
const relatedGrid = document.getElementById('related-grid');
related.forEach(item => {
  const card = document.createElement('div');
  card.className = 'related-card';
  card.innerHTML = `
    <img src="${item.img}" alt="${item.title}" />
    <h5>${item.title} ${ item.badge ? `<span class="badge">${item.badge}</span>` : '' }</h5>
    <p>${item.price}</p>
  `;
  relatedGrid.appendChild(card);
});
