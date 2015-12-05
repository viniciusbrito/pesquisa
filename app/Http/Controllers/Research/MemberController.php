<?php namespace App\Http\Controllers\Research;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Gestao\Membro;

class MemberController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

    /**
     * @param Request $request
     * @return array
     */
    public function store(Request $request)
	{
        $this->validate($request,[
            'nome_membro' => 'required|max:50',
            'cpf' => 'required|unique:PROJ_membros|max:16',
            'instituicao' => 'required|max:150',
            'titulacao_id' => 'exists:titulacaos,id',
            'categoria_id' => 'exists:categorias,id'
        ]);

        $membro = new Membro($request->all());
        $membro->save();

        return
            [
                'data'  => [
                    'idMembro' => $membro->idMembro,
                    'nome_membro' => $membro->nome_membro,
                    'cpf' => $membro->cpf,
                    'instituicao' => $membro->instituicao,
                    'titulacao_id' => $membro->titulacao_id,
                    'titulacao' => $membro->titulacao->name,
                    'categoria_id' => $membro->categoria_id,
                    'categoria' => $membro->categoria->name,
                    'cargaHoraria' => $request['cargaHoraria']
                ],
                'exibir' => false
            ];
	}

    /**
     * @param Request $request
     * @return array
     */
    public function show(Request $request)
    {
        $membro = Membro::where('cpf', 'like', $request->cpf)->first();
        if(($membro)) {
            return
                [
                    'data'  => [
                        'idMembro' => $membro->idMembro,
                        'nome_membro' => $membro->nome_membro,
                        'cpf' => $membro->cpf,
                        'instituicao' => $membro->instituicao,
                        'titulacao_id' => $membro->titulacao_id,
                        'titulacao' => $membro->titulacao->name,
                        'categoria_id' => $membro->categoria_id,
                        'categoria' => $membro->categoria->name,
                        'cargaHoraria' => ''
                    ],
                    'exibir' => true
                ];
        }
        else {
            return
                [
                    'data'  => [
                        'idMembro' => '',
                        'nome_membro' => '',
                        'cpf' => $request->cpf,
                        'instituicao' => '',
                        'titulacao_id' => '',
                        'titulacao' => '',
                        'categoria_id' => '',
                        'categoria' => '',
                        'cargaHoraria' => ''
                    ],
                    'exibir' => true
                ];
        }
    }

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
