import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const books = [
  {
    isbn: "0486284735",
    title: "Pride and Prejudice (Dover Thrift Editions: Classic Novels)",
    author: "Jane Austen",
    price: 450.0,
    stock: 15,
    publishDate: new Date("1995-04-12"),
    description:
      "A novel of manners, it follows the character development of Elizabeth Bennet, the protagonist of the book, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
  },
  {
    isbn: "0393966429",
    title: "Anna Karenina: Backgrounds and Sources Criticism",
    author: "Leo Tolstoy",
    price: 550.0,
    stock: 5,
    publishDate: new Date("1995-07-17"),
    description:
      "The novel deals with themes of betrayal, faith, family, marriage, Imperial Russian society, desire, and the differences between rural and urban life. The story centers on an extramarital affair between Anna and cavalry officer Count Alexei Kirillovich Vronsky that scandalizes the social circles of Saint Petersburg and forces the young lovers to flee to Italy in a search for happiness, but after they return to Russia, their lives further unravel.",
  },
  {
    isbn: "1439167346",
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    price: 140.0,
    stock: 20,
    publishDate: new Date("2013-02-06"),
    description:
      "Dale Carnegie's rock-solid, time-tested advice has carried countless people up the ladder of success in their business and personal lives. One of the most groundbreaking and timeless bestsellers of all time in American History.",
  },
  {
    isbn: "0143130722",
    title: "Ikigai: The Japanese Secret to a Long and Happy Life",
    author: "Héctor García, Francesc Miralles",
    price: 220.0,
    stock: 35,
    publishDate: new Date("2017-08-29"),
    description:
      "According to the Japanese, everyone has an ikigai—a reason for living. And according to the residents of the Japanese village with the world's longest-living people, finding it is the key to a happier and longer life. Having a strong sense of ikigai—where what you love, what you're good at, what you can get paid for, and what the world needs all overlap—means that each day is infused with meaning.",
  },
  {
    isbn: "0141033576",
    title: "Thinking, Fast and Slow",
    author: "Kahneman Daniel",
    price: 280.0,
    stock: 28,
    publishDate: new Date("2012-05-05"),
    description:
      "The guru to the gurus at last shares his knowledge with the rest of us. Nobel laureate Daniel Kahneman's seminal studies in behavioral psychology, behavioral economics, and happiness studies have influenced numerous other authors, including Steven Pinker and Malcolm Gladwell.In Thinking, Fast and Slow, Kahneman at last offers his own, first book for the general public.",
  },
  {
    isbn: "1788360087",
    title: "Don't Believe Everything You Think",
    author: "Edzard Ernst",
    price: 245.0,
    stock: 18,
    publishDate: new Date("2020-04-07"),
    description:
      "Discover how to conquer anxiety, self-doubt, and self-sabotage without depending on motivation or willpower. 'Don't Believe Everything You Think' uncovers the core of psychological suffering and offers insights to effortlessly shape the life you crave.",
  },
  {
    isbn: "1577311523",
    title: "The Power of Now: A Guide to Spiritual Enlightenment",
    author: "Eckhart Tolle",
    price: 640.0,
    stock: 12,
    publishDate: new Date("1999-09-27"),
    description:
      "To make the journey into the Now we will need to leave our analytical mind and its false created self, the ego, behind. From the very first page of Eckhart Tolle's extraordinary book, we move rapidly into a significantly higher altitude where we breathe a lighter air. We become connected to the indestructible essence of our Being.",
  },
  {
    isbn: "935699997X",
    title: "11 Rules For Life: Secrets to Level Up",
    author: "Chetan Bhagat",
    price: 340.0,
    stock: 52,
    publishDate: new Date("2024-01-26"),
    description:
      "One summer afternoon, Viraj, a food delivery guy, brings lunch for an author named Chetan. He is late and appears to be in distress. When Chetan asks him what the matter is, Viraj breaks down. 'I hate my life. My career is going nowhere. My girlfriend left me. I have no future,' he says. The author offers Viraj a deal. 'I can fix this for you. Come back every day, when I order lunch. Each day, I will tell you one secret I've learnt about life.'",
  },
  {
    isbn: "1592408419",
    title: "Daring Greatly: How the Courage to Be Vulnerable Transform",
    author: "Brené Brown",
    price: 240.0,
    stock: 36,
    publishDate: new Date("2015-04-07"),
    description:
      "The #1 New York Times bestseller. More than 2 million copies sold!Look for Brené Brown's new podcast, Dare to Lead, as well as her ongoing podcast Unlocking Us!From thought leader Brené Brown, a transformative new vision for the way we lead, love, work, parent, and educate that teaches us the power of vulnerability.",
  },
  {
    isbn: "0812975596",
    title: "The Wild Trees: A Story of Passion and Daring",
    author: "Richard Preston",
    price: 360.0,
    stock: 42,
    publishDate: new Date("2008-02-12"),
    description:
      "Hidden away in foggy, uncharted rain forest valleys in Northern California are the largest and tallest organisms the world has ever sustained-the coast redwood trees,Sequoia sempervirens. Ninety-six percent of the ancient redwood forests have been destroyed by logging, but the untouched fragments that remain are among the great wonders of nature.",
  },
  {
    isbn: "1455586668",
    title: "Deep Work: Rules for Focused Success in a Distracted World",
    author: "Cal Newport",
    price: 180.0,
    stock: 64,
    publishDate: new Date("2016-01-05"),
    description:
      "Master one of our economy's most rare skills and achieve groundbreaking results with this “exciting” book (Daniel H. Pink) from an “exceptional” author (New York Times Book Review).",
  },
  {
    isbn: "0525542876",
    title: "Digital Minimalism: Choosing a Focused Life in a Noisy World",
    author: "Cal Newport",
    price: 380.0,
    stock: 38,
    publishDate: new Date("2019-02-05"),
    description:
      "Minimalism is the art of knowing how much is just enough. Digital minimalism applies this idea to our personal technology. It's the key to living a focused life in an increasingly noisy world.",
  },
];

books.map(async (book) => {
  const createdBook = await prisma.book.create({
    data: {
      isbn: book.isbn ?? "",
      price: book.price,
      stock: book.stock,
      title: book.title ?? "",
      author: book.author ?? "",
      description: book.description ?? "",
      publishDate: book.publishDate ?? new Date(),
    },
  });
  console.log(createdBook);
});
