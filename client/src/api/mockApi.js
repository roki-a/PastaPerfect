const STORAGE_KEY = 'pasta-perfect-pasta'

const DEFAULT_PASTA = [
  {
    id: 1,
    name: 'Angel hair',
    image: 'angel-hair.png',
    alDenteSeconds: 180,
    firmSeconds: 150,
    softSeconds: 240,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
  {
    id: 2,
    name: 'Spaghetti',
    image: 'spaghetti.png',
    alDenteSeconds: 480,
    firmSeconds: 420,
    softSeconds: 540,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
  {
    id: 3,
    name: 'Fettuccine',
    image: 'fettuccine.png',
    alDenteSeconds: 600,
    firmSeconds: 540,
    softSeconds: 660,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
  {
    id: 4,
    name: 'Macaroni',
    image: 'macaroni.png',
    alDenteSeconds: 480,
    firmSeconds: 420,
    softSeconds: 540,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
  {
    id: 5,
    name: 'Fusilli',
    image: 'fusilli.png',
    alDenteSeconds: 540,
    firmSeconds: 480,
    softSeconds: 600,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
  {
    id: 6,
    name: 'Penne',
    image: 'penne.png',
    alDenteSeconds: 600,
    firmSeconds: 540,
    softSeconds: 660,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
  {
    id: 7,
    name: 'Farfalle',
    image: 'farfalle.png',
    alDenteSeconds: 600,
    firmSeconds: 540,
    softSeconds: 660,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
  {
    id: 8,
    name: 'Rigatoni',
    image: 'rigatoni.png',
    alDenteSeconds: 720,
    firmSeconds: 660,
    softSeconds: 780,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
  {
    id: 9,
    name: 'Ravioli',
    image: 'ravioli.png',
    alDenteSeconds: 180,
    firmSeconds: 150,
    softSeconds: 240,
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: false,
  },
]

function readPasta() {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(DEFAULT_PASTA),
    )

    return [...DEFAULT_PASTA]
  }

  try {
    return JSON.parse(stored)
  } catch {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(DEFAULT_PASTA),
    )

    return [...DEFAULT_PASTA]
  }
}

function writePasta(pasta) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(pasta),
  )
}

function nextId(pasta) {
  return (
    pasta.reduce(
      (highest, item) =>
        Math.max(
          highest,
          Number(item.id) || 0,
        ),
      0,
    ) + 1
  )
}

export async function listPasta(search = '') {
  const pasta = readPasta()

  const query = search.trim().toLowerCase()

  if (!query) {
    return pasta
  }

  return pasta.filter((item) =>
    item.name
      .toLowerCase()
      .includes(query),
  )
}

export async function getPasta(id) {
  const pasta = readPasta()

  const item = pasta.find(
    (p) => String(p.id) === String(id),
  )

  if (!item) {
    throw new Error('Pasta not found')
  }

  return item
}

export async function createPasta(data) {
  const pasta = readPasta()

  const item = {
    id: nextId(pasta),
    name: data.name,
    image: data.image,
    alDenteSeconds: Number(
      data.alDenteSeconds,
    ),
    firmSeconds: Number(
      data.firmSeconds,
    ),
    softSeconds: Number(
      data.softSeconds,
    ),
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
    isCustom: true,
  }

  pasta.push(item)
  writePasta(pasta)

  return item
}

export async function updatePastaTime(
  id,
  times,
) {
  const pasta = readPasta()

  const index = pasta.findIndex(
    (item) =>
      String(item.id) === String(id),
  )

  if (index === -1) {
    throw new Error('Pasta not found')
  }

  if (pasta[index].isCustom) {
    throw new Error(
      'Custom pasta cooking times cannot be updated here',
    )
  }

  pasta[index] = {
    ...pasta[index],
    customAlDenteSeconds:
      Number(times.alDenteSeconds),
    customFirmSeconds:
      Number(times.firmSeconds),
    customSoftSeconds:
      Number(times.softSeconds),
  }

  writePasta(pasta)

  return pasta[index]
}

export async function resetPastaTime(id) {
  const pasta = readPasta()

  const index = pasta.findIndex(
    (item) =>
      String(item.id) === String(id),
  )

  if (index === -1) {
    throw new Error('Pasta not found')
  }

  if (pasta[index].isCustom) {
    throw new Error(
      'Custom pasta cannot be reset as a predefined pasta',
    )
  }

  const defaults = DEFAULT_PASTA.find(
    (item) =>
      String(item.id) === String(id),
  )

  if (!defaults) {
    throw new Error(
      'Original pasta preset not found',
    )
  }

  pasta[index] = {
    ...pasta[index],
    customAlDenteSeconds: null,
    customFirmSeconds: null,
    customSoftSeconds: null,
  }

  writePasta(pasta)

  return pasta[index]
}

export async function updatePasta(
  id,
  data,
) {
  const pasta = readPasta()

  const index = pasta.findIndex(
    (item) =>
      String(item.id) === String(id),
  )

  if (index === -1) {
    throw new Error('Pasta not found')
  }

  if (!pasta[index].isCustom) {
    throw new Error(
      'Predefined pasta cannot be edited',
    )
  }

  pasta[index] = {
    ...pasta[index],
    name: data.name,
    image: data.image,
    alDenteSeconds: Number(
      data.alDenteSeconds,
    ),
    firmSeconds: Number(
      data.firmSeconds,
    ),
    softSeconds: Number(
      data.softSeconds,
    ),
  }

  writePasta(pasta)

  return pasta[index]
}

export async function deletePasta(id) {
  const pasta = readPasta()

  const item = pasta.find(
    (p) =>
      String(p.id) === String(id),
  )

  if (!item) {
    throw new Error('Pasta not found')
  }

  if (!item.isCustom) {
    throw new Error(
      'Predefined pasta cannot be deleted',
    )
  }

  const remaining = pasta.filter(
    (p) =>
      String(p.id) !== String(id),
  )

  writePasta(remaining)

  return null
}