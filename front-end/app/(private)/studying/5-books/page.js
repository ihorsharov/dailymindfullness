'use client';
import React from 'react';
import Image from 'next/image';
import image1 from '@/src/assets/booksImg/image1.png';
import image2 from '@/src/assets/booksImg/image2.png';
import image3 from '@/src/assets/booksImg/image3.png';
import image4 from '@/src/assets/booksImg/image4.png';
import image5 from '@/src/assets/booksImg/image5.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const page = () => {
  const InfoBooks = [
    {
      title:
        '“Людина в пошуках справжнього сенсу. Психолог у концтаборі", Віктор Франкл',
      desc: 'Книга австрійського психолога, філософа і колишнього в`язня нацистського концтабору Віктора Франкла у цій добірці посідає окреме місце, і саме тому з неї варто почати. "Людина в пошуках справжнього сенсу" — не лише головна книга Франкла, а й один з ключових текстів психології 20 століття. Психолог написав її в 1946 році, після того, як провів два роки в концтаборах в Аушвіці і Дахау. У ній він описує свій страшний досвід перебування там, а також формулює свій найважливіший психотерапевтичний метод — це пошук сенсу в усіх проявах життя, навіть найстрашніших. Книга написана ясно і неймовірно захоплююче, і тому стала однією з найбільш цитованих у світовій психології, розійшовшись по світу накладом в понад 15 мільйонів. А її головний месендж — знайти собі мету існування навіть у найскладніших умовах і мислити позитивно — елементарно і вкрай складно водночас.',
      image: image1,
    },
    {
      title: '"Несподівана радість самотності", Кетрін Грей',
      desc: 'Кетрін Грей — популярна журналістка і колумністка The Guardian, Stylist, The Telegraph. Українською нарешті публікується її бестселер про те, що на самоті теж можна жити щасливо. Письменниця розвіює усталені в нашій культурі уявлення, що всі обов`язково повинні жити в парі. "Книга присвячена одинакам, яких не розуміють, жаліють і вважають за бідолах, які нікого не можуть собі знайти. Кетрін Грей допомагає прийняти свою самотність, знайти в ній позитивні моменти, абстрагуватися від тиску суспільної думки і жити щасливо на самоті. Авторка зовсім не заперечує щастя від взаємин або шлюбу, а відстоює права самотніх, яких вважають білими воронами, і їхній вибір, адже бути щасливим і самотнім водночас — можна".',
      image: image2,
    },
    {
      title: '"Людина, що хотіла бути щасливою", Лоран Гунель',
      desc: 'Новинка від французького письменника і фахівця з особистісного розвитку Лорана Гунеля стала всесвітнім бестселером і перекладена більш ніж двадцятьма мовами світу. У цій книзі головний герой намагається знайти щастя. "Жуліано почувається нещасним, хоча, здається, має все. Випадково він опиняється в загубленому селищі, розташованому посеред балійських лісів. Там, далеко від галасливого і швидкоплинного світу, живе мудрець, цілитель душ Самтьян. Він має допомогти Жуліано, адже знає, де ховається щастя. Ця істина могла перевернути життя мільйонів людей і все навколо. Але знання, яке розкриває шлях до щастя, не можна просто так отримати, купити або навіть забрати силою. Його можна тільки зрозуміти".',
      image: image3,
    },
    {
      title: '"Вирішити можна все!", Марі Форлео',
      desc: 'Марі Форлео починала кар`єру як фінансистка на Нью-Йоркській фондовій біржі, але невдовзі перекваліфікувалася на тренерку особистісного зростання і блогерку. Серед її шанувальників — Опра Уїнфрі і Барак Обама. Українською мовою виходить бестселер №1 за версією "The New York Times" — її книга "Вирішити можна все". Назва відображає філософію успіху Марі. В анотації йдеться про те, що Форлео "обґрунтовує свою філософію, яка вчить не пасувати перед труднощами, а знаходити шляхи для їх подолання. Книга допомагає читачам навчитися рухатися до мети, усувати всі відмовки і виправдання, які стоять на шляху до успіху; перемагати свої страхи, зрозуміти нарешті, чого вони хочуть, і почати діяти. Марі Форлео підкріплює свої установки десятками історій із власного життя і життя людей, які скористалися її порадами',
      image: image4,
    },

    {
      title:
        '"Бути окей. Що важливо знати про психічне здоров’я", Дарка Озерна',
      desc: 'Марі Форлео починала кар`єру як фінансистка на Нью-Йоркській фондовій біржі, але невдовзі перекваліфікувалася на тренерку особистісного зростання і блогерку. Серед її шанувальників — Опра Уїнфрі і Барак Обама. Українською мовою виходить бестселер №1 за версією "The New York Times" — її книга "Вирішити можна все". Назва відображає філософію успіху Марі. В анотації йдеться про те, що Форлео "обґрунтовує свою філософію, яка вчить не пасувати перед труднощами, а знаходити шляхи для їх подолання. Книга допомагає читачам навчитися рухатися до мети, усувати всі відмовки і виправдання, які стоять на шляху до успіху; перемагати свої страхи, зрозуміти нарешті, чого вони хочуть, і почати діяти. Марі Форлео підкріплює свої установки десятками історій із власного життя і життя людей, які скористалися її порадами',
      image: image5,
    },
  ];

  const router = useRouter();

  const handleBackClick = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <section className=" flex justify-center">
      <div className="w-[80%] flex flex-col gap-[55px]">
        <h1 className="font-semibold text-[48px]">
          П`ять книг для ментального здоров`я
        </h1>
        <div className=" flex flex-col gap-[32px] pb-[30px]">
          {InfoBooks.map((book, index) => (
            <div key={index} className="flex flex-row justify-between">
              <div className="flex flex-col gap-[24px] ">
                <h1 className="font-semibold text-[24px]">{book.title}</h1>
                <p className="w-[716px] text-[20px] leading-[24.38px]">
                  {book.desc}
                </p>
              </div>
              <Image src={book.image} alt="book" />
            </div>
          ))}
          <button
            onClick={handleBackClick}
            className="text-base font-semibold border w-[200px] px-4 py-2 border-black rounded-lg">
            Повернутися назад
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
