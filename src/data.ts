// Mock backend data
export default [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    projects: [
      {
        id: 'project1',
        user_id: 'user1',
        name: 'Weather App',
        description: 'A weather app that shows the weather in your area',
        methods: [
          {
            id: 'method1',
            project_id: 'project1',
            name: 'Get Weather',
            blocks: [
              {
                id: 'block_start',
                method_id: 'method1',
                name: 'Start',
                top: 10,
                left: 10,
                flow_in: [],
                flow_out: [
                  {
                    id: 'flow_out1',
                    type: 'flow',
                    name: 'next',
                    block_id: 'block1'
                  }
                ],
                params_in: [],
                params_out: []
              },
              {
                id: 'block_end',
                method_id: 'method1',
                name: 'End',
                top: 10,
                left: 400,
                flow_in: [
                  {
                    id: 'flow_in1',
                    type: 'flow',
                    name: 'end',
                    block_id: 'block1'
                  }
                ],
                flow_out: [],
                params_in: [
                  {
                    id: 'param_in1',
                    type: 'string',
                    name: 'message',
                    block_id: 'block1'
                  }
                ],
                params_out: []
              },
              {
                id: 'block1',
                method_id: 'method1',
                name: 'Test string',
                top: 10,
                left: 200,
                params_in: [],
                params_out: [
                  {
                    id: 'param_out1',
                    type: 'string',
                    name: 'message',
                    block_id: 'block_end'
                  }
                ]
              },
              {
                id: 'block2',
                method_id: 'method1',
                name: 'Test int',
                top: 130,
                left: 200,
                params_in: [],
                params_out: [
                  {
                    id: 'param_out2',
                    type: 'string',
                    name: 'message',
                    block_id: 'block_end'
                  }
                ]
              }
            ]
          }
        ],
        endpoints: [
          {
            id: 'endpoint1',
            project_id: 'project1',
            name: 'Get Weather',
            uri: '/weather',
            method: 'GET',
            middleware: [
              {
                id: 1,
                name: 'Auth',
                type: 'auth'
              }
            ]
          }
        ]
      }
    ]
  }
]
