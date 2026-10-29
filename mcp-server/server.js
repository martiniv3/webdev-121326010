
const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');

// Зареждаме лекциите веднъж при стартиране.
const lectures = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'lectures.json'), 'utf8')
);

// Форматиране на резултат от инструмент.
function textResult(id, text, isError) {
  return {
    jsonrpc: '2.0',
    id: id,
    result: {
      content: [{ type: 'text', text: text }],
      isError: isError,
    },
  };
}

// Инструментите, които сървърът предлага.
const tools = [
  {
    name: 'find_lecture',
    description:
      'Find information about lectures.',
    inputSchema: {
      type: 'object',
      properties: {
        number: {
          type: 'integer',
          description: 'Lecture number, 1 to 12',
        },
      },
      required: ['number'],
    },
  },
  {
    name: 'list_lectures',
    description:
      'List the number and title of every course lecture. Use it when asked what the course covers.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
];

// Изпращаме един JSON отговор на ред.
function send(reply) {
  process.stdout.write(JSON.stringify(reply) + '\n');
}

// Обработваме входящите JSON-RPC съобщения.
function handle(msg) {
  if (msg.method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: {
        protocolVersion: msg.params.protocolVersion,
        capabilities: { tools: {} },
        serverInfo: { name: 'lectures', version: '0.1.0' },
      },
    };
  }

  if (msg.method === 'notifications/initialized') {
    return null;
  }

  if (msg.method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id: msg.id,
      result: { tools: tools },
    };
  }

  if (msg.method === 'tools/call') {
    const name = msg.params.name;
    const args = msg.params.arguments || {};

    if (name === 'find_lecture') {
      const lecture = lectures.find((l) => l.number === args.number);

      if (!lecture) {
        return textResult(
          msg.id,
          'There is no lecture ' + args.number +
            '. The course has lectures 1 to 12.',
          true
        );
      }

      return textResult(
        msg.id,
        'Lecture ' + lecture.number + ': ' +
          lecture.title + '. Topics: ' + lecture.topics,
        false
      );
    }

    if (name === 'list_lectures') {
      return textResult(
        msg.id,
        lectures.map((l) => l.number + '. ' + l.title).join('\n'),
        false
      );
    }

    return {
      jsonrpc: '2.0',
      id: msg.id,
      error: {
        code: -32602,
        message: 'Unknown tool: ' + name,
      },
    };
  }

  if (msg.id !== undefined) {
    return {
      jsonrpc: '2.0',
      id: msg.id,
      error: {
        code: -32601,
        message: 'Unknown method: ' + msg.method,
      },
    };
  }

  return null;
}

const lines = readline.createInterface({
  input: process.stdin,
});

lines.on('line', (line) => {
  console.error('got: ' + line);

  try {
    const msg = JSON.parse(line);
    const reply = handle(msg);

    if (reply) {
      send(reply);
    }
  } catch (error) {
    console.error('Error processing message:', error.message);
  }
});