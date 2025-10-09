export function renderVenueList(container, venues) {
  const venueElements = venues.map((venue) => createVenueCard(venue));
  container.innerHTML = "";
  container.append(...venueElements);
}

const createVenueCard = (venue) => {
  const { media, id } = venue;

  const card = document.createElement("a");
  card.className = "h-64 bg-center bg-cover rounded-lg shadow-md";
  card.href = `/venue/?id=${id}`;

  const imageUrl = media?.[0] || "https://placehold.co/400x400";
  card.style.backgroundImage = `url(${imageUrl})`;

  return card;
};
