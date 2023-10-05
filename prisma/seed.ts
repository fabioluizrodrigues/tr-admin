import { ContaTipo } from '@prisma/client';
import { db } from '../src/lib/db.server';
import { faker } from '@faker-js/faker';

async function seed() {
  
  const quantity = 1200;
  
  await db.pessoa.deleteMany();
  Array.from(Array(quantity).keys()).forEach(async () => {
    await db.pessoa.create({
      data: {
        nome_razao: faker.person.fullName(),
        cnpj_cpf: faker.number.int().toString().substring(0,14),
        ie_rg: faker.number.int().toString().substring(0,5),
        cep: faker.location.zipCode(),
        endereco: faker.location.streetAddress(),
        numero: faker.number.int().toString().substring(0,5),
        bairro: faker.string.alpha(),
        municipio: faker.location.city(),
        uf: faker.string.alpha().toLocaleUpperCase().substring(0,2),
        telefone: faker.phone.number(),
        celular: faker.phone.number(),
        email: faker.internet.email(),
        observacoes: faker.lorem.lines(2)
      },
    });
  });

  await db.veiculo.deleteMany();
  Array.from(Array(quantity).keys()).forEach(async () => {
    await db.veiculo.create({
      data: {
        placa: faker.string.alpha(3).toLocaleUpperCase()
            + faker.number.int({min: 0, max: 9}) 
            + faker.string.fromCharacters(['A','B','C','D','E','F','G','H','I','J']).toLocaleUpperCase()
            + faker.number.int({min: 10, max: 99}),
        renavam: faker.number.int().toString().substring(0, 10),
        nr_eixos: faker.number.int({min: 2, max: 4}),
        ano_fabrica: faker.date.past().getFullYear(),
        ano_modelo: faker.date.past().getFullYear(),
        ano_exercicio: faker.date.past().getFullYear(),
        marca: faker.vehicle.manufacturer(),
        modelo: faker.vehicle.model(),
        cor:  faker.vehicle.color(),
        observacoes: faker.word.words({ count: { min: 5, max: 10 } }),
      },
    });

  });


  await db.conta.deleteMany();

  const pessoas = await db.pessoa.findMany({select: {id: true}});

  pessoas.map(async pessoa  =>  {
    await db.conta.create({
      data : {
        pessoa_id : pessoa.id,
        tipo: ContaTipo.CAIXA,
        descricao: faker.word.words({ count: { min: 2, max: 6 } }),
        ativo: true
      }
    });

  });

}

seed().finally(() => db.$disconnect());
